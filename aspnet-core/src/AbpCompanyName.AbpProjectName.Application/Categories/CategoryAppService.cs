using System.Linq;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.Categories.Dto;

namespace AbpCompanyName.AbpProjectName.Categories
{

    [AbpAuthorize]
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {
        public CategoryAppService(
            IRepository<Category> repository)
            : base(repository)
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected override IQueryable<Category> CreateFilteredQuery(PagedCategoryResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), b => b.Name.Contains(input.Keyword));
        }

    }
}
