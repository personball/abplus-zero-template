using System;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Members.Dto
{
    public class PagedMemberUserResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Keyword { get; set; }
        public DateTimeOffset? From { get; set; }
        public DateTimeOffset? To { get; set; }
    }
}
