using Abp.AutoMapper;
using AbpCompanyName.AbpProjectName.Users.Dto;

namespace AbpCompanyName.AbpProjectName.Members.Dto
{
    [AutoMapFrom(typeof(MemberUser))]
    public class MemberUserDto : UserDto
    {
        public string NickName { get; set; }

        public string HeadLogo { get; set; }

        public Gender Gender { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string Country { get; set; }
    }
}
