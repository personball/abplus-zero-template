using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class TestEmailSettingsInput
    {
        [Required]
        [MaxLength(256)]
        public string To { get; set; }
    }
}
