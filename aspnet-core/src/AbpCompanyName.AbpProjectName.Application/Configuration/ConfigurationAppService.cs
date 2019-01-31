using System;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Net.Mail;
using Abp.Runtime.Session;
using Abp.UI;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Configuration.Dto;

namespace AbpCompanyName.AbpProjectName.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : AbpProjectNameAppServiceBase, IConfigurationAppService
    {
        private readonly IEmailSender _emailSender;

        public ConfigurationAppService(
            IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }

        #region Email

        public async Task<EmailSettingsDto> GetEmailSettings()
        {
            return new EmailSettingsDto
            {
                DefaultFromAddress = await SettingManager.GetSettingValueAsync(EmailSettingNames.DefaultFromAddress),
                DefaultFromDisplayName = await SettingManager.GetSettingValueAsync(EmailSettingNames.DefaultFromDisplayName),
                SmtpDomain = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Domain),
                SmtpHost = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Host),
                SmtpEnableSsl = await GetBooleanSetting(EmailSettingNames.Smtp.EnableSsl),
                SmtpPort = await GetNumberSetting(EmailSettingNames.Smtp.Port),
                SmtpUseDefaultCredentials = await GetBooleanSetting(EmailSettingNames.Smtp.UseDefaultCredentials),
                SmtpUserName = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.UserName),
                SmtpPassword = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Password)
            };
        }

        public async Task TestEmailSettings(TestEmailSettingsInput input)
        {
            var user = await GetCurrentUserAsync();

            try
            {
                await _emailSender.SendAsync(
                       input.To,
                       $"This is a TEST-Email from AbpProjectName.",
                       $"This is a TEST-Email from AbpProjectName. Hello, {user.FullName}, your email settings all right.");
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(ex.Message);
            }
        }

        public async Task UpdateEmailSettings(EmailSettingsDto input)
        {
            //强制设定这两个选项，避免在ui上让用户迷惑，除非明确知道这两个选项的作用
            input.SmtpUseDefaultCredentials = false;
            input.SmtpDomain = string.Empty;

            if (AbpSession.TenantId.HasValue)
            {
                var tenantId = AbpSession.TenantId.Value;
                await ChangeForTenant(tenantId, EmailSettingNames.DefaultFromAddress, input.DefaultFromAddress);
                await ChangeForTenant(tenantId, EmailSettingNames.DefaultFromDisplayName, input.DefaultFromDisplayName);
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.Domain, input.SmtpDomain);
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.EnableSsl, input.SmtpEnableSsl.ToString());
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.Host, input.SmtpHost);
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.Password, input.SmtpPassword);
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.Port, input.SmtpPort.ToString());
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.UseDefaultCredentials, input.SmtpUseDefaultCredentials.ToString());
                await ChangeForTenant(tenantId, EmailSettingNames.Smtp.UserName, input.SmtpUserName);
            }
            else
            {
                await ChangeForApplication(EmailSettingNames.DefaultFromAddress, input.DefaultFromAddress);
                await ChangeForApplication(EmailSettingNames.DefaultFromDisplayName, input.DefaultFromDisplayName);
                await ChangeForApplication(EmailSettingNames.Smtp.Domain, input.SmtpDomain);
                await ChangeForApplication(EmailSettingNames.Smtp.EnableSsl, input.SmtpEnableSsl.ToString());
                await ChangeForApplication(EmailSettingNames.Smtp.Host, input.SmtpHost);
                await ChangeForApplication(EmailSettingNames.Smtp.Password, input.SmtpPassword);
                await ChangeForApplication(EmailSettingNames.Smtp.Port, input.SmtpPort.ToString());
                await ChangeForApplication(EmailSettingNames.Smtp.UseDefaultCredentials, input.SmtpUseDefaultCredentials.ToString());
                await ChangeForApplication(EmailSettingNames.Smtp.UserName, input.SmtpUserName);
            }
        }

        #endregion

        #region Security
        public async Task<SecuritySettingsDto> GetSecuritySettings()
        {
            return new SecuritySettingsDto
            {
                IsEmailConfirmationRequiredForLogin = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin),
                UserLockOutIsEnabled = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.UserLockOut.IsEnabled),
                UserLockOutDefaultAccountLockoutSeconds = await GetNumberSetting(AbpZeroSettingNames.UserManagement.UserLockOut.DefaultAccountLockoutSeconds),
                UserLockOutMaxFailedAccessAttemptsBeforeLockout = await GetNumberSetting(AbpZeroSettingNames.UserManagement.UserLockOut.MaxFailedAccessAttemptsBeforeLockout),

                TwoFactorLoginIsEnabled = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsEnabled),
                TwoFactorLoginIsEmailProviderEnabled = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsEmailProviderEnabled),
                TwoFactorLoginIsRememberBrowserEnabled = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsRememberBrowserEnabled),
                TwoFactorLoginIsSmsProviderEnabled = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsSmsProviderEnabled),

                PasswordComplexityRequiredLength = await GetNumberSetting(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequiredLength),
                PasswordComplexityRequireDigit = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireDigit),
                PasswordComplexityRequireLowercase = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireLowercase),
                PasswordComplexityRequireUppercase = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireUppercase),
                PasswordComplexityRequireNonAlphanumeric = await GetBooleanSetting(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireNonAlphanumeric)
            };
        }

        public async Task UpdateSecuritySettings(SecuritySettingsDto input)
        {
            if (AbpSession.TenantId.HasValue)
            {
                var tenantId = AbpSession.TenantId.Value;
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin, input.IsEmailConfirmationRequiredForLogin.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.UserLockOut.IsEnabled, input.UserLockOutIsEnabled.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.UserLockOut.DefaultAccountLockoutSeconds, input.UserLockOutDefaultAccountLockoutSeconds.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.UserLockOut.MaxFailedAccessAttemptsBeforeLockout, input.UserLockOutMaxFailedAccessAttemptsBeforeLockout.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsEnabled, input.TwoFactorLoginIsEnabled.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsEmailProviderEnabled, input.TwoFactorLoginIsEmailProviderEnabled.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsRememberBrowserEnabled, input.TwoFactorLoginIsRememberBrowserEnabled.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsSmsProviderEnabled, input.TwoFactorLoginIsSmsProviderEnabled.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireDigit, input.PasswordComplexityRequireDigit.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.PasswordComplexity.RequiredLength, input.PasswordComplexityRequiredLength.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireLowercase, input.PasswordComplexityRequireLowercase.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireUppercase, input.PasswordComplexityRequireUppercase.ToString());
                await ChangeForTenant(tenantId, AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireNonAlphanumeric, input.PasswordComplexityRequireNonAlphanumeric.ToString());
            }
            else
            {
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin, input.IsEmailConfirmationRequiredForLogin.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.UserLockOut.IsEnabled, input.UserLockOutIsEnabled.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.UserLockOut.DefaultAccountLockoutSeconds, input.UserLockOutDefaultAccountLockoutSeconds.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.UserLockOut.MaxFailedAccessAttemptsBeforeLockout, input.UserLockOutMaxFailedAccessAttemptsBeforeLockout.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsEnabled, input.TwoFactorLoginIsEnabled.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsEmailProviderEnabled, input.TwoFactorLoginIsEmailProviderEnabled.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsRememberBrowserEnabled, input.TwoFactorLoginIsRememberBrowserEnabled.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.TwoFactorLogin.IsSmsProviderEnabled, input.TwoFactorLoginIsSmsProviderEnabled.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireDigit, input.PasswordComplexityRequireDigit.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequiredLength, input.PasswordComplexityRequiredLength.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireLowercase, input.PasswordComplexityRequireLowercase.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireUppercase, input.PasswordComplexityRequireUppercase.ToString());
                await ChangeForApplication(AbpZeroSettingNames.UserManagement.PasswordComplexity.RequireNonAlphanumeric, input.PasswordComplexityRequireNonAlphanumeric.ToString());
            }
        }
        #endregion

        private async Task<bool> GetBooleanSetting(string name) => bool.TrueString.Equals(await SettingManager.GetSettingValueAsync(name), StringComparison.CurrentCultureIgnoreCase);

        private async Task<int> GetNumberSetting(string name) => int.Parse(await SettingManager.GetSettingValueAsync(name));

        private async Task ChangeForTenant(int tenantId, string name, string value) => await SettingManager.ChangeSettingForTenantAsync(tenantId, name, value);

        private async Task ChangeForApplication(string name, string value) => await SettingManager.ChangeSettingForApplicationAsync(name, value);
    }
}

