using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.Regions.Dto;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.Regions
{
    public class RegionAppService : AbpProjectNameAppServiceBase, IRegionAppService
    {

        private readonly IRepository<Region, string> _regionRepository;

        public RegionAppService(
            IRepository<Region, string> regionRepository)
        {
            _regionRepository = regionRepository;
        }

        public async Task<ListResultDto<RegionDto>> GetAll(string parentId)
        {
            var children = await _regionRepository.GetAll()
                .WhereIf(parentId.IsNullOrWhiteSpace(), r => r.Id.Length <= 2)
                .WhereIf(!parentId.IsNullOrWhiteSpace() && parentId.Length <= 2, r => r.Id.Length == 4 && r.Id.StartsWith(parentId))
                .WhereIf(!parentId.IsNullOrWhiteSpace() && parentId.Length == 4, r => r.Id.Length == 6 && r.Id.StartsWith(parentId))
                .OrderBy(r => r.Id)
                .ToListAsync();

            return new ListResultDto<RegionDto>
            {
                Items = ObjectMapper.Map<List<RegionDto>>(children)
            };
        }
    }
}
