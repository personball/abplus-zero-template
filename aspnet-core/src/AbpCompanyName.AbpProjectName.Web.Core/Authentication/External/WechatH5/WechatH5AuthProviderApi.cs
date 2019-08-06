using System.Threading.Tasks;
using Castle.Core.Logging;
using AbpCompanyName.AbpProjectName.WechatH5;
using WebApiClient;
namespace AbpCompanyName.AbpProjectName.Authentication.External.WechatH5
{
    public class WechatH5AuthProviderApi : ExternalAuthProviderApiBase
    {
        public ILogger Logger { get; set; }

        public WechatH5AuthProviderApi()
        {
            Logger = NullLogger.Instance;
        }

        public override async Task<ExternalAuthUserInfo> GetUserInfo(string accessCode)
        {
            var client = HttpApiClient.Create<IWeChatH5Api>();

            //拿code换accessToken
            var token = await client.AuthCodeAsync(ProviderInfo.ClientId, ProviderInfo.ClientSecret, accessCode);
            //获取用户信息
            var user = await client.GetUserInfoAsync(token.access_token, token.openid);

            return new WechatH5AuthUserInfo
            {
                EmailAddress = $"{user.openid}@SmartCanteen.com",
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
