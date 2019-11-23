using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Categories.Dto
{
    public class PagedCategoryResultRequestDto : PagedResultRequestDto
    {
        /// <summary>
        /// 关键词
        /// </summary>
        public string Keyword { get; set; }

        /// <summary>
        /// 父分类
        /// </summary>
        public int? ParentCategoryId { get; set; }
    }
}
