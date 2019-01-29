using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Auditing.Dto;

namespace AbpCompanyName.AbpProjectName.Auditing
{
    public interface IAuditLogAppService : IAsyncCrudAppService<AuditLogDto, long, PagedAuditLogResultRequestDto, AuditLogDto, AuditLogDto>
    {
    }
}
