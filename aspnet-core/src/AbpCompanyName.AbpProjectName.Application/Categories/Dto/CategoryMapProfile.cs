using AutoMapper;

namespace AbpCompanyName.AbpProjectName.Categories.Dto
{
    public class CategoryMapProfile : Profile
    {
        public CategoryMapProfile()
        {
            CreateMap<CategoryDto, Category>()
                .ForMember(x => x.CreationTime, opt => opt.Ignore());
        }
    }
}
