using AbpCompanyName.AbpProjectName.WechatH5.ApiResults;
using AbpCompanyName.AbpProjectName.WechatMini;
using WebApiClientCore;
using WebApiClientCore.Attributes;
#pragma warning disable CS1570
namespace AbpCompanyName.AbpProjectName.WechatH5
{
    /// <summary>
    /// 微信服务号用户认证相关api
    /// </summary>
    [LogFilter]
    [HttpHost("https://api.weixin.qq.com")]
    public interface IWeChatH5Api : IHttpApi
    {
        /// <summary>
        /// code换token
        /// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
        /// </summary>
        /// <param name="appid"></param>
        /// <param name="secret"></param>
        /// <param name="code"></param>
        /// <param name="grant_type"></param>
        /// <returns></returns>
        [HttpGet("/sns/oauth2/access_token")]
        [JsonReturn]
        ITask<H5AuthApiResult> AuthCodeAsync(string appid, string secret, string code, string grant_type = "authorization_code");

        /// <summary>
        /// 刷新token
        /// https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
        /// </summary>
        /// <param name="appid"></param>
        /// <param name="refresh_token"></param>
        /// <param name="grant_type"></param>
        /// <returns></returns>
        [HttpGet("/sns/oauth2/refresh_token")]
        [JsonReturn]
        ITask<H5RefreshTokenResult> RefreshTokenAsync(string appid, string refresh_token, string grant_type = "refresh_token");

        /// <summary>
        /// 拉取用户信息
        /// https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
        /// </summary>
        /// <param name="access_token"></param>
        /// <param name="openid"></param>
        /// <param name="lang"></param>
        /// <returns></returns>
        [HttpGet("/sns/userinfo")]
        [JsonReturn]
        ITask<H5UserInfoResult> GetUserInfoAsync(string access_token, string openid, string lang = "zh_CN");

        /// <summary>
        /// 验证token有效性
        /// https://api.weixin.qq.com/sns/auth?access_token=ACCESS_TOKEN&openid=OPENID
        /// </summary>
        /// <param name="access_token"></param>
        /// <param name="openid"></param>
        /// <returns></returns>
        [HttpGet("/sns/auth")]
        [JsonReturn]
        ITask<H5ValidTokenResult> ValidateToken(string access_token, string openid);

        /// <summary>
        /// 模板消息接口
        /// https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN
        /// </summary>
        /// <param name="access_token"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("/cgi-bin/message/template/send")]
        [JsonReturn]
        ITask<H5TplMsgResult> TplMsgNotify(string access_token, [JsonContent]object input);
    }
}
#pragma warning restore CS1570