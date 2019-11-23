using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName.Categories
{
    /// <summary>
    /// 分类
    /// </summary>
    public class Category : FullAuditedEntity
    {
        public const int NameMaxLength = 64;

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        public int? ParentCategoryId { get; set; }

        public Category ParentCategory { get; set; }
    }
}
