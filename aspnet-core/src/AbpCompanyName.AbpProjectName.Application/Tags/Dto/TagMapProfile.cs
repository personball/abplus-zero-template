using AutoMapper;

namespace AbpCompanyName.AbpProjectName.Tags.Dto
{
    public class TagMapProfile : Profile
    {
        public TagMapProfile()
        {
            CreateMap<TagDto, Tag>()
                .ForMember(x => x.CreationTime, opt => opt.Ignore());
        }
    }
}
