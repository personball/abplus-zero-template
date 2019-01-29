using System;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Auditing.Dto
{
    public class PagedAuditLogResultRequestDto : PagedResultRequestDto
    {
        public int? ExeDurationGreaterThan { get; set; }
        public int? ExeDurationLessThan { get; set; }
        public string MethodName { get; set; }
        public string ServiceName { get; set; }
        public DateTimeOffset? From { get; set; }
        public DateTimeOffset? To { get; set; }
    }
}
