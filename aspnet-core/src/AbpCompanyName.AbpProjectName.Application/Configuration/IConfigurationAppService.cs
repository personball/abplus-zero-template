using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.Configuration.Dto;

namespace AbpCompanyName.AbpProjectName.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);

        #region Email

        Task<EmailSettingsDto> GetEmailSettings();

        Task UpdateEmailSettings(EmailSettingsDto input);

        Task TestEmailSettings(TestEmailSettingsInput input);
        #endregion
    }
}

