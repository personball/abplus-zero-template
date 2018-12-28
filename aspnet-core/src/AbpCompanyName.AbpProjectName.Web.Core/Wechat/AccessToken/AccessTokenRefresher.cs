using System;
using System.Threading.Tasks;
using Abp.Runtime.Caching;
using AbpCompanyName.AbpProjectName.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using WebApiClient;

namespace AbpCompanyName.AbpProjectName.Wechat.AccessToken
{
    public class AccessTokenRefresher : IAccessTokenRefresher
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly ICacheManager _cacheManager;

        public AccessTokenRefresher(
             IHostingEnvironment env
            , ICacheManager cacheManager)
        {
            _appConfiguration = env.GetAppConfiguration();
            _cacheManager = cacheManager;
        }

        public async Task Refresh()
        {
            var client = HttpApiClient.Create<IWeChatApi>();

            var appId = _appConfiguration["App:Wechat:AppId"];
            var appSecret = _appConfiguration["App:Wechat:AppSecret"];

            var accessToken = await client.GetAccessTokenAsync(appId, appSecret);
            //获取access token,写入缓存,缓存有效期以expire_in为准
            if (accessToken != null)
            {
                var tokenCache = _cacheManager.GetCache<string, string>(WechatConsts.WechatCacheName);
                tokenCache.Set(WechatConsts.AccessTokenCacheKey
                    , accessToken.access_token
                    , TimeSpan.FromSeconds(accessToken.expires_in)
                    , TimeSpan.FromSeconds(accessToken.expires_in));
            }
            else
            {
                throw new AbpProjectNameBusinessException(ErrorCode.WechatAccessTokenIsEmpty);
            }
        }
    }
}
