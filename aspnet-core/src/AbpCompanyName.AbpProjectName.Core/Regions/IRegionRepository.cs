using System.Threading.Tasks;
using Abp.Domain.Repositories;

namespace AbpCompanyName.AbpProjectName.Regions
{
    public interface IRegionRepository : IRepository<Region, string>
    {
        Task<string> GetFullName(string regionId);
    }
}
