using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class UserLockOutSettingsDto
    {
        public bool IsEnabled { get; set; }

        [Range(1, 99)]
        public int MaxFailedAccessAttemptsBeforeLockout { get; set; }

        [Range(300, int.MaxValue)]
        public int DefaultAccountLockoutSeconds { get; set; }
    }
}
