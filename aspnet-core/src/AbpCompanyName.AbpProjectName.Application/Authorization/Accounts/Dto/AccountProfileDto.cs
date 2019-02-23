using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Users;
using AbpCompanyName.AbpProjectName.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto
{
    public class AccountProfileDto
    {
        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }


        [MaxLength(User.HeadLogoMaxLength)]
        public string HeadLogo { get; set; }
    }
}
