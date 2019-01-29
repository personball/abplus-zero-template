using System;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.AutoMapper;
using Abp.Extensions;

namespace AbpCompanyName.AbpProjectName.Auditing.Dto
{
    [AutoMapFrom(typeof(AuditLog))]
    public class AuditLogDto : EntityDto<long>
    {
        public long? ImpersonatorUserId { get; set; }
        public string Exception { get; set; }
        public string BrowserInfo { get; set; }
        public string ClientName { get; set; }
        public string ClientIpAddress { get; set; }
        public int ExecutionDuration { get; set; }
        public DateTime ExecutionTime { get; set; }
        public int? TenantId { get; set; }
        public string MethodName { get; set; }
        public string ServiceName { get; set; }
        public long? UserId { get; set; }
        public int? ImpersonatorTenantId { get; set; }
        public string Parameters { get; set; }
        public string CustomData { get; set; }

        public bool HasException
        {
            get
            {
                return !this.Exception.IsNullOrWhiteSpace();
            }
        }
    }
}
