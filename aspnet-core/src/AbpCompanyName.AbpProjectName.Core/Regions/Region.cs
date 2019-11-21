using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;

namespace AbpCompanyName.AbpProjectName.Regions
{
    /// <summary>
    /// 地区
    /// </summary>
    public class Region : Entity<string>
    {
        public const int NameMaxLength = 128;

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }
    }
}
