using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Json;
using Abp.MultiTenancy;
using Abp.Runtime.Security;
using AbpCompanyName.AbpProjectName.Authentication.External;
using AbpCompanyName.AbpProjectName.Authentication.External.WechatH5;
using AbpCompanyName.AbpProjectName.Authentication.External.WechatMini;
using AbpCompanyName.AbpProjectName.Authentication.External.WechatMini.Events;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Members;
using AbpCompanyName.AbpProjectName.Models.TokenAuth;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TokenAuthController : AbpProjectNameControllerBase
    {
        private readonly LogInManager _logInManager;
        private readonly ITenantCache _tenantCache;
        private readonly AbpLoginResultTypeHelper _abpLoginResultTypeHelper;
        private readonly TokenAuthConfiguration _configuration;
        private readonly IExternalAuthConfiguration _externalAuthConfiguration;
        private readonly IExternalAuthManager _externalAuthManager;
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IHostingEnvironment _env;

        public TokenAuthController(
            LogInManager logInManager,
            ITenantCache tenantCache,
            AbpLoginResultTypeHelper abpLoginResultTypeHelper,
            TokenAuthConfiguration configuration,
            IExternalAuthConfiguration externalAuthConfiguration,
            IExternalAuthManager externalAuthManager,
            UserRegistrationManager userRegistrationManager,
            IHostingEnvironment env)
        {
            _logInManager = logInManager;
            _tenantCache = tenantCache;
            _abpLoginResultTypeHelper = abpLoginResultTypeHelper;
            _configuration = configuration;
            _externalAuthConfiguration = externalAuthConfiguration;
            _externalAuthManager = externalAuthManager;
            _userRegistrationManager = userRegistrationManager;

            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        [HttpPost]
        public async Task<AuthenticateResultModel> Authenticate([FromBody] AuthenticateModel model)
        {
            var loginResult = await GetLoginResultAsync(
                model.UserNameOrEmailAddress,
                model.Password,
                GetTenancyNameOrNull()
            );

            var accessToken = CreateAccessToken(CreateJwtClaims(loginResult.Identity));

            return new AuthenticateResultModel
            {
                AccessToken = accessToken,
                EncryptedAccessToken = GetEncrpyedAccessToken(accessToken),
                ExpireInSeconds = (int)_configuration.Expiration.TotalSeconds,
                UserId = loginResult.User.Id
            };
        }

        [HttpGet]
        public List<ExternalLoginProviderInfoModel> GetExternalAuthenticationProviders()
        {
            return ObjectMapper.Map<List<ExternalLoginProviderInfoModel>>(_externalAuthConfiguration.Providers);
        }

        [HttpPost]
        public async Task<ExternalAuthenticateResultModel> ExternalAuthenticate([FromBody] ExternalAuthenticateModel model)
        {
            Logger.Debug($"ExternalAuthenticate:{model.ToJsonString()}");

            if (model.AuthProvider == "WechatH5")
            {
                var decryptText = SimpleStringCipher.Instance.Decrypt(model.ProviderAccessCode, AppConsts.DefaultPassPhrase);
                var arr = decryptText.Split('|');
                var expiredCode = DateTime.Now.AddMinutes(-1);

                if (arr.Length > 1)
                {
                    DateTime.TryParse(arr[1], out expiredCode);
                }

                if (expiredCode < DateTime.Now)
                {
                    throw new AbpProjectNameBusinessException(ErrorCode.Forbidden);
                }

                model.ProviderAccessCode = arr[0];
            }

            var externalUser = await GetExternalUserInfo(model);

            var loginResult = await _logInManager.LoginAsync(new UserLoginInfo(model.AuthProvider, externalUser.ProviderKey, model.AuthProvider), GetTenancyNameOrNull());

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    {

                        var accessToken = CreateAccessToken(CreateJwtClaims(loginResult.Identity));

                        //登陆成功时更新sessionkey
                        if (externalUser is WechatMiniAuthUserInfo)
                        {
                            var userInfo = externalUser as WechatMiniAuthUserInfo;
                            EventBus.Trigger(new WechatLoginSuccessEventData
                            {
                                SessionKey = userInfo.SessionKey,
                                UserId = loginResult.User.Id
                            });
                        }

                        return new ExternalAuthenticateResultModel
                        {
                            AccessToken = accessToken,
                            EncryptedAccessToken = GetEncrpyedAccessToken(accessToken),
                            ExpireInSeconds = (int)_configuration.Expiration.TotalSeconds
                        };
                    }
                case AbpLoginResultType.UnknownExternalLogin:
                    {
                        var newUser = await RegisterExternalUserAsync(externalUser);
                        if (!newUser.IsActive)
                        {
                            return new ExternalAuthenticateResultModel
                            {
                                WaitingForActivation = true
                            };
                        }

                        // Try to login again with newly registered user!
                        loginResult = await _logInManager.LoginAsync(new UserLoginInfo(model.AuthProvider, externalUser.ProviderKey, model.AuthProvider), GetTenancyNameOrNull());
                        if (loginResult.Result != AbpLoginResultType.Success)
                        {
                            throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(
                                loginResult.Result,
                                externalUser.ProviderKey,
                                GetTenancyNameOrNull()
                            );
                        }

                        return new ExternalAuthenticateResultModel
                        {
                            AccessToken = CreateAccessToken(CreateJwtClaims(loginResult.Identity)),
                            ExpireInSeconds = (int)_configuration.Expiration.TotalSeconds
                        };
                    }
                default:
                    {
                        throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(
                            loginResult.Result,
                            externalUser.ProviderKey,
                            GetTenancyNameOrNull()
                        );
                    }
            }
        }

        private async Task<User> RegisterExternalUserAsync(ExternalAuthUserInfo externalUser)
        {
            var user = await _userRegistrationManager.RegisterAsync<MemberUser>(
                externalUser.Name,
                externalUser.Surname,
                externalUser.EmailAddress,
                externalUser.EmailAddress,
                Authorization.Users.User.CreateRandomPassword(),
                true
            );

            if (externalUser is WechatMiniAuthUserInfo)
            {
                user.SessionKey = (externalUser as WechatMiniAuthUserInfo).SessionKey;
            }

            if (externalUser is WechatH5AuthUserInfo)
            {
                //缓存access token 干啥用?
                var h5User = externalUser as WechatH5AuthUserInfo;
                user.WechatH5RefreshToken = h5User.RefreshToken;
                user.WechatH5RefreshTokenExpiredIn = DateTime.Now.AddDays(30);
                user.NickName = h5User.NickName;
                user.Province = h5User.Province;
                user.City = h5User.City;
                user.Gender = h5User.Gender;
                user.Country = h5User.Country;
                user.HeadLogo = h5User.HeadLogo;
                user.UnionId = h5User.UnionId;
                user.OpenId = h5User.OpenId;
            }

            user.Logins = new List<UserLogin>
            {
                new UserLogin
                {
                    LoginProvider = externalUser.Provider,
                    ProviderKey = externalUser.ProviderKey,
                    TenantId = user.TenantId
                }
            };

            await CurrentUnitOfWork.SaveChangesAsync();

            return user;
        }

        private async Task<ExternalAuthUserInfo> GetExternalUserInfo(ExternalAuthenticateModel model)
        {
            var userInfo = await _externalAuthManager.GetUserInfo(model.AuthProvider, model.ProviderAccessCode);
            //if (userInfo.ProviderKey != model.ProviderKey)
            //{
            //    throw new UserFriendlyException(L("CouldNotValidateExternalUser"));
            //}

            return userInfo;
        }

        private string GetTenancyNameOrNull()
        {
            if (!AbpSession.TenantId.HasValue)
            {
                return null;
            }

            return _tenantCache.GetOrNull(AbpSession.TenantId.Value)?.TenancyName;
        }

        private async Task<AbpLoginResult<Tenant, User>> GetLoginResultAsync(string usernameOrEmailAddress, string password, string tenancyName)
        {
            var loginResult = await _logInManager.LoginAsync(usernameOrEmailAddress, password, tenancyName);

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    return loginResult;
                default:
                    throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(loginResult.Result, usernameOrEmailAddress, tenancyName);
            }
        }

        private string CreateAccessToken(IEnumerable<Claim> claims, TimeSpan? expiration = null)
        {
            var now = DateTime.UtcNow;

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _configuration.Issuer,
                audience: _configuration.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(expiration ?? _configuration.Expiration),
                signingCredentials: _configuration.SigningCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }

        private static List<Claim> CreateJwtClaims(ClaimsIdentity identity)
        {
            var claims = identity.Claims.ToList();
            var nameIdClaim = claims.First(c => c.Type == ClaimTypes.NameIdentifier);

            // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
            claims.AddRange(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, nameIdClaim.Value),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.Now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            });

            return claims;
        }

        private string GetEncrpyedAccessToken(string accessToken)
        {
            return SimpleStringCipher.Instance.Encrypt(accessToken, AppConsts.DefaultPassPhrase);
        }

        #region 微信网页授权
        //微信认证地址
        [Route("WechatH5Auth")]
        [HttpGet]
        public IActionResult WechatH5Auth(string targetUrl)
        {
            var appId = _appConfiguration["Authentication:WechatH5:AppId"];
            Uri uriResult;
            Uri.TryCreate(new Uri(_appConfiguration["App:ServerRootAddress"]), "/api/TokenAuth/WechatH5AuthCallback/WechatH5AuthCallback", out uriResult);
            //var redirect = WebUtility.UrlEncode($"{_appConfiguration["App:ServerRootAddress"]}/api/TokenAuth/WechatH5AuthCallback/WechatH5AuthCallback?targetUrl={targetUrl}");
            var redirect = WebUtility.UrlEncode($"{uriResult.AbsoluteUri}?targetUrl={WebUtility.UrlEncode(targetUrl)}");
            var scope = "snsapi_userinfo";
            var state = WebUtility.UrlEncode(SimpleStringCipher.Instance.Encrypt($"{DateTime.Now.AddMinutes(5).ToString()}", AppConsts.DefaultPassPhrase));//用5分钟后的时间戳对称加密下

            Logger.Debug($"WechatH5Auth:state:{state}");

            return Redirect($"https://open.weixin.qq.com/connect/oauth2/authorize?appid={appId}&redirect_uri={redirect}&response_type=code&scope={scope}&state={state}#wechat_redirect");
        }

        //微信认证回调
        [Route("WechatH5AuthCallback")]
        [HttpGet]
        public IActionResult WechatH5AuthCallback(string code, string state, string targetUrl)
        {
            Logger.Debug($"WechatH5AuthCallback:state:{state}");

            //state验证
            var expiredState = DateTime.Now.AddMinutes(-1);
            DateTime.TryParse(SimpleStringCipher.Instance.Decrypt(state, AppConsts.DefaultPassPhrase), out expiredState);
            if (expiredState < DateTime.Now)
            {
                throw new AbpProjectNameBusinessException(ErrorCode.Forbidden);
            }

            //拿code直接加盐对称加密丢给前端,再让前端调用External Login接口换BearerToken
            var encryptedCode = WebUtility.UrlEncode(SimpleStringCipher.Instance.Encrypt($"{code}|{DateTime.Now.AddMinutes(5).ToString()}", AppConsts.DefaultPassPhrase));

            Logger.Debug($"WechatH5AuthCallback:encryptedCode:{encryptedCode}");

            return Redirect($"{targetUrl}?encryptedCode={encryptedCode}");
        }
        #endregion
    }
}

