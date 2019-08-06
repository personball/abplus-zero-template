using System.Threading.Tasks;
using Abp.Runtime.Caching;

namespace AbpCompanyName.AbpProjectName.WechatMini.AccessToken
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
            return new WechatAccessToken
            {
                Token = await _cacheManager.GetCache<string, string>(WechatMiniConsts.WechatCacheName)
                .GetOrDefaultAsync(WechatMiniConsts.AccessTokenCacheKey)
            };
        }
    }
}
