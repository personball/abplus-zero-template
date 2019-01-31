namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class SecuritySettingsDto
    {
        public bool IsEmailConfirmationRequiredForLogin { get; set; }
        
        #region UserLockout
        public bool UserLockOutIsEnabled { get; set; }
        public int UserLockOutMaxFailedAccessAttemptsBeforeLockout { get; set; }
        public int UserLockOutDefaultAccountLockoutSeconds { get; set; }
        #endregion
        
        #region TwoFactorLogin
        public bool TwoFactorLoginIsEnabled { get; set; }
        public bool TwoFactorLoginIsEmailProviderEnabled { get; set; }
        public bool TwoFactorLoginIsSmsProviderEnabled { get; set; }
        public bool TwoFactorLoginIsRememberBrowserEnabled { get; set; }
        #endregion

        #region PasswordComplexity
        public int PasswordComplexityRequiredLength { get; set; }
        public bool PasswordComplexityRequireNonAlphanumeric { get; set; }
        public bool PasswordComplexityRequireLowercase { get; set; }
        public bool PasswordComplexityRequireUppercase { get; set; }
        public bool PasswordComplexityRequireDigit { get; set; }
        #endregion
    }
}
