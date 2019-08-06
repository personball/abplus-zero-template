using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Members;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Repositories.Members
{
    public class MemberUserRepository : AbpProjectNameRepositoryBase<MemberUser, long>, IMemberUserRepository
    {
        public MemberUserRepository(IDbContextProvider<AbpProjectNameDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<Dictionary<DateTime, int>> UserStatics(DateTime from, DateTime to, bool perDay = false)
        {
            var query = await Context.MemberUserStatics.Where(u => u.CreationTime >= from && u.CreationTime < to)
                .GroupBy(u => new { u.AtYear, u.AtMon, u.AtDay }, (g, rows) => new
                {
                    g.AtYear,
                    g.AtMon,
                    g.AtDay,
                    Count = rows.Count()
                }).ToListAsync();

            if (perDay)
            {
                return query.ToDictionary(x => new DateTime(x.AtYear, x.AtMon, x.AtDay), x => x.Count);
            }
            else
            {
                return query.GroupBy(x => new { x.AtYear, x.AtMon }, (g, rows) => new
                {
                    g.AtYear,
                    g.AtMon,
                    Count = rows.Sum(x => x.Count)
                }).ToDictionary(x => new DateTime(x.AtYear, x.AtMon, 1), x => x.Count);
            }
        }
    }
}
