using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;

namespace AbpCompanyName.AbpProjectName.Members
{
    public interface IMemberUserRepository : IRepository<MemberUser, long>
    {
        Task<Dictionary<DateTime, int>> UserStatics(DateTime from, DateTime to, bool perDay = false);
    }
}
