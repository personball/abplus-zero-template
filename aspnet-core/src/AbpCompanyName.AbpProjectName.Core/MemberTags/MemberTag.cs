using Abp.Domain.Entities.Auditing;
using AbpCompanyName.AbpProjectName.Members;
using AbpCompanyName.AbpProjectName.Tags;

namespace AbpCompanyName.AbpProjectName.MemberTags
{
    /// <summary>
    /// 会员标签
    /// </summary>
    public class MemberTag : CreationAuditedEntity
    {
        public long MemberUserId { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }

        public MemberUser MemberUser { get; set; }
    }
}
