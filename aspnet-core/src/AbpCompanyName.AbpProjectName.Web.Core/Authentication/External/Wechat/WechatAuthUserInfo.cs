namespace AbpCompanyName.AbpProjectName.Authentication.External.Wechat
{
    public class WechatAuthUserInfo : ExternalAuthUserInfo
    {
        public string SessionKey { get; set; }
       
        public string OpenId { get; set; }
    }
}
