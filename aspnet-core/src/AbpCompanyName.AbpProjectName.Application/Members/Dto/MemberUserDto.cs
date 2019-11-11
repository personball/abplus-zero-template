using Abp.AutoMapper;
using AbpCompanyName.AbpProjectName.Users.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AbpCompanyName.AbpProjectName.Members.Dto
{
    [AutoMapFrom(typeof(MemberUser))]
    public class MemberUserDto : UserDto
    {
        /// <summary>
        /// 昵称
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadLogo { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        /// <summary>
        /// 城市
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// 省份
        /// </summary>
        public string Province { get; set; }

        /// <summary>
        /// 国家
        /// </summary>
        public string Country { get; set; }
    }
}
