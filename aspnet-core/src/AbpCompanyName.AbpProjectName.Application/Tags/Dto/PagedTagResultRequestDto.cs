using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Tags.Dto
{
    public class PagedTagResultRequestDto : PagedResultRequestDto
    {
        /// <summary>
        /// 标签类型
        /// </summary>
        public TagType? TagType { get; set; }
    }
}
