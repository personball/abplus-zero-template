using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace AbpCompanyName.AbpProjectName.Categories.Dto
{
    [AutoMapFrom(typeof(Category))]
    public class CategoryDto : EntityDto
    {
        /// <summary>
        /// 分类名称
        /// </summary>
        [StringLength(Category.NameMaxLength)]
        public string Name { get; set; }
        /// <summary>
        /// 父分类名
        /// </summary>
        public string ParentCategoryName { get; set; }
        /// <summary>
        /// 父分类
        /// </summary>
        public int? ParentCategoryId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreationTime { get; set; }
    }
}
