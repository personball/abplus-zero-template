using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.Wechat;
using Castle.Core.Logging;
using WebApiClient;

namespace AbpCompanyName.AbpProjectName.Authentication.External.Wechat
{
    public class WechatAuthProviderApi : ExternalAuthProviderApiBase
    {
        public ILogger Logger { get; set; }

        public WechatAuthProviderApi()
        {
            Logger = NullLogger.Instance;
        }

        public override async Task<ExternalAuthUserInfo> GetUserInfo(string accessCode)
        {
            var client = HttpApiClient.Create<IWeChatApi>();

            var authResult = await client.AuthCodeAsync(ProviderInfo.ClientId, ProviderInfo.ClientSecret, accessCode);

            if (authResult.errcode == 0)
            {
                return new WechatAuthUserInfo
                {
                    EmailAddress = $"{authResult.unionid}@planfork.com",
                    Name = $"{authResult.openid}",
                    Provider = ProviderInfo.Name,
                    ProviderKey = authResult.unionid,
                    Surname = authResult.openid,
                    SessionKey = authResult.session_key,
                    OpenId = authResult.openid,
                    UnionId = authResult.unionid
                };
            }
            else
            {
                Logger.Error($"{GetType().FullName}:{authResult.errcode},{authResult.errmsg}");
                throw new AbpProjectNameBusinessException(ErrorCode.WechatAuthByCodeFailed);
            }
        }
    }
}
