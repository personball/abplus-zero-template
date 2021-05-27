using System;
using System.Threading.Tasks;
using Abp.Runtime.Caching;
using AbpCompanyName.AbpProjectName.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.WechatMini.AccessToken
{
    public class AccessTokenRefresher : IAccessTokenRefresher
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly ICacheManager _cacheManager;
        private readonly IWeChatMiniApi _client;

        public AccessTokenRefresher(
             IWebHostEnvironment env
            , ICacheManager cacheManager,
             IWeChatMiniApi client)
        {
            _client = client;
            _appConfiguration = env.GetAppConfiguration();
            _cacheManager = cacheManager;
        }

        public async Task Refresh()
        {
            
            var appId = _appConfiguration["Authentication:WechatMini:AppId"];
            var appSecret = _appConfiguration["Authentication:WechatMini:AppSecret"];

            if (_appConfiguration["Authentication:WechatH5:IsEnabled"].ToLower() == bool.TrueString.ToLower())
            {
                appId = _appConfiguration["Authentication:WechatH5:AppId"];
                appSecret = _appConfiguration["Authentication:WechatH5:AppSecret"];
            }

            var accessToken = await _client.GetAccessTokenAsync(appId, appSecret);
            //获取access token,写入缓存,缓存有效期以expire_in为准
            if (accessToken != null)
            {
                var tokenCache = _cacheManager.GetCache<string, string>(WechatMiniConsts.WechatCacheName);
                tokenCache.Set(WechatMiniConsts.AccessTokenCacheKey
                    , accessToken.access_token
                    , TimeSpan.FromSeconds(accessToken.expires_in));
            }
            else
            {
                throw new AbpProjectNameBusinessException(ErrorCode.WechatAccessTokenIsEmpty);
            }
        }
    }
}
