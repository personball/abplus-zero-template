using System.Net.Http;
using WebApiClientCore;
using WebApiClientCore.Attributes;

namespace AbpCompanyName.AbpProjectName.WechatMini
{
    [LogFilter]
    [HttpHost("https://api.weixin.qq.com")]
    public interface IWeChatMiniApi : IHttpApi
    {
        [HttpGet("/sns/jscode2session")]
        [JsonReturn(EnsureMatchAcceptContentType = false)]
        ITask<AuthApiResult> AuthCodeAsync(string appid, string secret, string js_code, string grant_type = "authorization_code");

        //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        [HttpGet("/cgi-bin/token")]
        [JsonReturn]
        ITask<AccessTokenResult> GetAccessTokenAsync(string appid, string secret, string grant_type = "client_credential");

        //https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN
        [HttpPost("/wxa/getwxacodeunlimit")]
        ITask<HttpResponseMessage> GetWXCodeUnlimit(string access_token, [JsonContent] QrCodeBRequest request);
    }
}
