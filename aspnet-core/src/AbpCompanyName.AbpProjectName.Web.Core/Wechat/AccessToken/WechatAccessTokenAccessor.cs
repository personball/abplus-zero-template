using System.Threading.Tasks;
using Abp.Runtime.Caching;

namespace AbpCompanyName.AbpProjectName.Wechat.AccessToken
{
    public class WechatAccessTokenAccessor : IWechatAccessTokenAccessor
    {
        private readonly ICacheManager _cacheManager;
        public WechatAccessTokenAccessor(ICacheManager cacheManager)
        {
            _cacheManager = cacheManager;
        }
        public async Task<WechatAccessToken> GetToken()
        {
            return await _cacheManager.GetWechatCachedAccessToken();
        }
    }
}
