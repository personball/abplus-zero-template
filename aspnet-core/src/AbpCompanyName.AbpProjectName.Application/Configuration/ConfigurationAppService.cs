using System;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Net.Mail;
using Abp.Runtime.Session;
using Abp.UI;
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
                SmtpEnableSsl = bool.TrueString.Equals(
                    await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.EnableSsl), StringComparison.CurrentCultureIgnoreCase),
                SmtpPort = int.Parse(await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Port)),
                SmtpUseDefaultCredentials = bool.TrueString.Equals(
                    await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.UseDefaultCredentials), StringComparison.CurrentCultureIgnoreCase),
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
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.DefaultFromAddress, input.DefaultFromAddress);
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.DefaultFromDisplayName, input.DefaultFromDisplayName);
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.Domain, input.SmtpDomain);
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.EnableSsl, input.SmtpEnableSsl.ToString());
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.Host, input.SmtpHost);
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.Password, input.SmtpPassword);
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.Port, input.SmtpPort.ToString());
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.UseDefaultCredentials, input.SmtpUseDefaultCredentials.ToString());
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, EmailSettingNames.Smtp.UserName, input.SmtpUserName);
            }
            else
            {
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.DefaultFromAddress, input.DefaultFromAddress);
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.DefaultFromDisplayName, input.DefaultFromDisplayName);
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Domain, input.SmtpDomain);
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.EnableSsl, input.SmtpEnableSsl.ToString());
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Host, input.SmtpHost);
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Password, input.SmtpPassword);
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Port, input.SmtpPort.ToString());
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.UseDefaultCredentials, input.SmtpUseDefaultCredentials.ToString());
                await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.UserName, input.SmtpUserName);
            }
        }

        #endregion



    }
}

