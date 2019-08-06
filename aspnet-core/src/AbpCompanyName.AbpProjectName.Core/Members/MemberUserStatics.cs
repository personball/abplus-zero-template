using System;

namespace AbpCompanyName.AbpProjectName.Members
{
    /// <summary>
    /// Query Types
    /// </summary>
    public class MemberUserStatics
    {
        public long UserId { get; set; }
        public DateTime CreationTime { get; set; }
        public int AtYear { get; set; }
        public int AtMon { get; set; }
        public int AtDay { get; set; }
    }
}
