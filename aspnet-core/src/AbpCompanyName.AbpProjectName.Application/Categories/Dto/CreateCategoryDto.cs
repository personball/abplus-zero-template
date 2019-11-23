using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;

namespace AbpCompanyName.AbpProjectName.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    public class CreateCategoryDto
    {
        /// <summary>
        /// 分类名称
        /// </summary>
        [MaxLength(Category.NameMaxLength)]
        public string Name { get; set; }

        /// <summary>
        /// 父分类
        /// </summary>
        public int? ParentCategoryId { get; set; }
    }
}
