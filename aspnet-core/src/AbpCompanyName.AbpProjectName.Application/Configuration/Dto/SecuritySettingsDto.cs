namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class SecuritySettingsDto
    {
        public bool IsEmailConfirmationRequiredForLogin { get; set; }

        public UserLockOutSettingsDto UserLockOut { get; set; }

        public TwoFactorLoginSettingsDto TwoFactorLogin { get; set; }

        public PasswordComplexitySettingsDto PasswordComplexity { get; set; }
    }
}
