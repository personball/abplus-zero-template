using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class PasswordComplexitySettingsDto
    {
        [Range(3, 20)]
        public int RequiredLength { get; set; }
        public bool RequireNonAlphanumeric { get; set; }
        public bool RequireLowercase { get; set; }
        public bool RequireUppercase { get; set; }
        public bool RequireDigit { get; set; }
    }
}
