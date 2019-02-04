using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Models.TokenAuth
{
    public class AuthenticateModel
    {
        [Required]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string UserNameOrEmailAddress { get; set; }

        [Required]
        [DisableAuditing]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]
        public string Password { get; set; }
        
        public bool RememberClient { get; set; }
    }
}

