using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.Auditing.Dto;

namespace AbpCompanyName.AbpProjectName.Auditing
{
    [DisableAuditing]
    [AbpAuthorize]
    public class AuditLogAppService : AsyncCrudAppService<AuditLog, AuditLogDto, long, PagedAuditLogResultRequestDto, AuditLogDto, AuditLogDto>, IAuditLogAppService
    {
        public AuditLogAppService(
            IRepository<AuditLog, long> repository)
            : base(repository)
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected override IQueryable<AuditLog> CreateFilteredQuery(PagedAuditLogResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.ServiceName.IsNullOrWhiteSpace(), a => a.ServiceName.Contains(input.ServiceName))
                .WhereIf(!input.MethodName.IsNullOrWhiteSpace(), a => a.MethodName.Contains(input.MethodName))
                .WhereIf(input.ExeDurationGreaterThan.HasValue, a => a.ExecutionDuration >= input.ExeDurationGreaterThan)
                .WhereIf(input.ExeDurationLessThan.HasValue, a => a.ExecutionDuration <= input.ExeDurationLessThan)
                .WhereIf(input.From.HasValue, b => b.ExecutionTime >= input.From.Value.LocalDateTime)
                .WhereIf(input.To.HasValue, b => b.ExecutionTime <= input.To.Value.LocalDateTime);
            //CreationTime是按照服务器时间存储，故表单提交的UTC时间可转为服务器LocalDateTime进行比较
        }

        protected override IQueryable<AuditLog> ApplySorting(IQueryable<AuditLog> query, PagedAuditLogResultRequestDto input)
        {
            return base.ApplySorting(query, input).OrderByDescending(a => a.ExecutionTime);
        }

        [RemoteService(false)]
        public override Task<AuditLogDto> CreateAsync(AuditLogDto input) => throw new NotImplementedException();
        
        [RemoteService(false)]
        public override Task<AuditLogDto> UpdateAsync(AuditLogDto input) => throw new NotImplementedException();

        [RemoteService(false)]
        public override Task DeleteAsync(EntityDto<long> input) => throw new NotImplementedException();
    }
}
