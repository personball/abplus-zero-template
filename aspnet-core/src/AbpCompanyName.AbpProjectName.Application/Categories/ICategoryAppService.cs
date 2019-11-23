using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Categories.Dto;

namespace AbpCompanyName.AbpProjectName.Categories
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>
    {
    }
}
