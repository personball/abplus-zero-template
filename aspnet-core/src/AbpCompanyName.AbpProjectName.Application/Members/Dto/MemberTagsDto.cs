using System.Collections.Generic;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Members.Dto
{
    public class MemberTagsDto : EntityDto<long>
    {
        public MemberTagsDto()
        {
            TagIds = new List<int>();
        }

        public List<int> TagIds { get; set; }
    }
}
