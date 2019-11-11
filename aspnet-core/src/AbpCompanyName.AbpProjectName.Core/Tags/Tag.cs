using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName.Tags
{
    /// <summary>
    /// 标签
    /// </summary>
    public class Tag : FullAuditedEntity
    {
        public const int NameMaxLength = 32;
        public const int DescriptionMaxLength = 256;
        public const int ColorMaxLength = 6;

        /// <summary>
        /// 标签类型
        /// </summary>
        public TagType Type { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        /// <summary>
        /// 标签描述
        /// </summary>
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        [MaxLength(ColorMaxLength)]
        public string Color { get; set; }
    }
}
