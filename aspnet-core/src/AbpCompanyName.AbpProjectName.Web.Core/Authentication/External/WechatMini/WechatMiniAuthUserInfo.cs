namespace AbpCompanyName.AbpProjectName.Authentication.External.WechatMini
{
    public class WechatMiniAuthUserInfo : ExternalAuthUserInfo
    {
        public string SessionKey { get; set; }
       
        public string OpenId { get; set; }
    }
}
