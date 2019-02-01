namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class TwoFactorLoginSettingsDto
    {
        public bool IsEnabled { get; set; }
        public bool IsEmailProviderEnabled { get; set; }
        public bool IsSmsProviderEnabled { get; set; }
        public bool IsRememberBrowserEnabled { get; set; }
    }
}
