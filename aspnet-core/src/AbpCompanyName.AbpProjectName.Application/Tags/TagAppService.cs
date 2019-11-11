using System.Linq;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.Tags.Dto;

namespace AbpCompanyName.AbpProjectName.Tags
{
    [AbpAuthorize]
    public class TagAppService : AsyncCrudAppService<Tag, TagDto, int, PagedTagResultRequestDto, TagDto, TagDto>, ITagAppService
    {
        public TagAppService(
            IRepository<Tag> repository)
            : base(repository)
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected override IQueryable<Tag> CreateFilteredQuery(PagedTagResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(input.TagType.HasValue, b => b.Type == input.TagType);
        }
    }
}
