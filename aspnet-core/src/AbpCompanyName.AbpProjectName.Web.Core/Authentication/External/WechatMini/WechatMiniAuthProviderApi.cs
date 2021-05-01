using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.WechatMini;
using Castle.Core.Logging;

namespace AbpCompanyName.AbpProjectName.Authentication.External.WechatMini
{
    public class WechatMiniAuthProviderApi : ExternalAuthProviderApiBase
    {
        private readonly IWeChatMiniApi _client;
        public ILogger Logger { get; set; }

        public WechatMiniAuthProviderApi(IWeChatMiniApi client)
        {
            _client = client;
            Logger = NullLogger.Instance;
        }

        public override async Task<ExternalAuthUserInfo> GetUserInfo(string accessCode)
        {

            var authResult = await _client.AuthCodeAsync(ProviderInfo.ClientId, ProviderInfo.ClientSecret, accessCode);

            if (authResult.errcode == 0)
            {
                return new WechatMiniAuthUserInfo
                {
                    EmailAddress = $"{authResult.openid}@AbpProjectName.com",
                    Name = $"{authResult.openid}",
                    Provider = ProviderInfo.Name,
                    ProviderKey = authResult.openid,
                    Surname = authResult.openid,
                    SessionKey = authResult.session_key,
                    OpenId = authResult.openid
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
