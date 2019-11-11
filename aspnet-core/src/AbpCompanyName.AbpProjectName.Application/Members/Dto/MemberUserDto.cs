using Abp.AutoMapper;
using AbpCompanyName.AbpProjectName.Users.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AbpCompanyName.AbpProjectName.Members.Dto
{
    [AutoMapFrom(typeof(MemberUser))]
    public class MemberUserDto : UserDto
    {
        public string NickName { get; set; }

        public string HeadLogo { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string Country { get; set; }
    }
}
