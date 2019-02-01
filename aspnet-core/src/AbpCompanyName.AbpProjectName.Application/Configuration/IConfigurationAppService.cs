using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.Configuration.Dto;

namespace AbpCompanyName.AbpProjectName.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
        #region Security

        Task<SecuritySettingsDto> GetSecuritySettings();

        Task UpdateEmailConfirmationSetting(EmailConfirmationSettingDto input);

        Task UpdateUserLockoutSettings(UserLockOutSettingsDto input);

        Task UpdateTwoFactorLoginSettings(TwoFactorLoginSettingsDto input);

        Task UpdatePasswordComplexitySettings(PasswordComplexitySettingsDto input);
      
        #endregion

        #region Email

        Task<EmailSettingsDto> GetEmailSettings();

        Task UpdateEmailSettings(EmailSettingsDto input);

        Task TestEmailSettings(TestEmailSettingsInput input);
        #endregion
    }
}

