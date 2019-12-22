using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Regions.Dto;

namespace AbpCompanyName.AbpProjectName.Regions
{
    public interface IRegionAppService : IApplicationService
    {
        Task<ListResultDto<RegionDto>> GetAll(string parentId);
    }
}
