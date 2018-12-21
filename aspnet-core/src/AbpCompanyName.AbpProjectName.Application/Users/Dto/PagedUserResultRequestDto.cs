using System;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Users.Dto
{
    public class PagedUserResultRequestDto : PagedResultRequestDto
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public DateTimeOffset? From { get; set; }
        public DateTimeOffset? To { get; set; }
    }
}

