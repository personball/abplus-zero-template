using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto
{
    public class ChangePasswordInput
    {
        [Required]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string CurrentPassword { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string NewPassword { get; set; }
    }
}
