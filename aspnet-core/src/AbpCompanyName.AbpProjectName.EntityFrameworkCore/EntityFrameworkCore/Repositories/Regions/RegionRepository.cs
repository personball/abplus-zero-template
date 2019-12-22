using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore;
using Abp.Extensions;
using AbpCompanyName.AbpProjectName.Regions;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Repositories.Regions
{
    public class RegionRepository : AbpProjectNameRepositoryBase<Region, string>, IRegionRepository
    {
        public RegionRepository(IDbContextProvider<AbpProjectNameDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<string> GetFullName(string regionId)
        {
            var pid = "";
            var cid = "";
            var did = "";

            if (regionId.Length > 0)
            {
                if (regionId.Length > 1)
                {
                    pid = regionId.Substring(0, 2);
                }
                else
                {
                    pid = regionId;
                }
            }

            if (regionId.Length > 2)
            {
                cid = regionId.Substring(0, 4);
            }

            if (regionId.Length > 4)
            {
                did = regionId;
            }

            var regions = await GetAllListAsync(r => r.Id == pid || r.Id == cid || r.Id == did);

            var result = "";
            var pname = regions.FirstOrDefault(r => r.Id == pid)?.Name ?? "";
            if (!pname.IsNullOrWhiteSpace())
            {
                result = $"{pname},";
            }
            var cname = regions.FirstOrDefault(r => r.Id == cid)?.Name ?? "";
            if (!cname.IsNullOrWhiteSpace())
            {
                result = $"{result}{cname},";
            }
            var dname = regions.FirstOrDefault(r => r.Id == did)?.Name ?? "";
            if (!dname.IsNullOrWhiteSpace())
            {
                result = $"{result}{dname}";
            }

            return result.TrimEnd(',');
        }
    }
}
