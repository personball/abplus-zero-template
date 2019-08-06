namespace AbpCompanyName.AbpProjectName.Authentication.External.WechatH5
{
    public class WechatH5AuthUserInfo : ExternalAuthUserInfo
    {
        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public string OpenId { get; set; }
        public string UnionId { get; set; }

        public string NickName { get; set; }
        public Gender Gender { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string HeadLogo { get; set; }

    }
}
