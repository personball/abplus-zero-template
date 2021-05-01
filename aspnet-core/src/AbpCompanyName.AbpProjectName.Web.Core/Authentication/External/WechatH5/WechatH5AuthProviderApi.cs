using System.Threading.Tasks;
using Castle.Core.Logging;
using AbpCompanyName.AbpProjectName.WechatH5;
namespace AbpCompanyName.AbpProjectName.Authentication.External.WechatH5
{
    public class WechatH5AuthProviderApi : ExternalAuthProviderApiBase
    {
        private readonly IWeChatH5Api _client;
        public ILogger Logger { get; set; }

        public WechatH5AuthProviderApi(IWeChatH5Api client)
        {
            Logger = NullLogger.Instance;
            _client = client;
        }

        public override async Task<ExternalAuthUserInfo> GetUserInfo(string accessCode)
        {
            //拿code换accessToken
            var token = await _client.AuthCodeAsync(ProviderInfo.ClientId, ProviderInfo.ClientSecret, accessCode);
            //获取用户信息
            var user = await _client.GetUserInfoAsync(token.access_token, token.openid);

            return new WechatH5AuthUserInfo
            {
                EmailAddress = $"{user.openid}@AbpProjectName.com",
                Name = $"{user.openid}",
                Provider = ProviderInfo.Name,
                ProviderKey = user.openid,
                Surname = user.openid,
                AccessToken = token.access_token,
                RefreshToken = token.refresh_token,
                City = user.city,
                Province = user.province,
                Country = user.country,
                Gender = user.sex == 1 ? Gender.Male : Gender.Female,
                HeadLogo = user.headimgurl,
                NickName = user.nickname,
                OpenId = token.openid,
                UnionId = user.unionid
            };
        }
    }
}
