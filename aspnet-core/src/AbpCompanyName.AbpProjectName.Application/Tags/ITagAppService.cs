using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Tags.Dto;

namespace AbpCompanyName.AbpProjectName.Tags
{
    public interface ITagAppService : IAsyncCrudAppService<TagDto, int, PagedTagResultRequestDto, TagDto, TagDto>
    {
    }
}
