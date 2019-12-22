using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace AbpCompanyName.AbpProjectName.Regions.Dto
{
    [AutoMapFrom(typeof(Region))]
    public class RegionDto : EntityDto<string>
    {
        public string Name { get; set; }
    }
}
