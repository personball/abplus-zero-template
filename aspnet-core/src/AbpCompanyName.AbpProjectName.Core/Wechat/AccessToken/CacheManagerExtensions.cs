using System.Threading.Tasks;
using Abp.Runtime.Caching;

namespace AbpCompanyName.AbpProjectName.Wechat.AccessToken
{
    public static class CacheManagerExtensions
    {
        public static async Task<WechatAccessToken> GetWechatCachedAccessToken(this ICacheManager cacheManager)
        {
            return new WechatAccessToken
            {
                Token = await cacheManager.GetCache<string, string>(WechatConsts.WechatCacheName)
                .GetOrDefaultAsync(WechatConsts.AccessTokenCacheKey)
            };
        }
    }
}
