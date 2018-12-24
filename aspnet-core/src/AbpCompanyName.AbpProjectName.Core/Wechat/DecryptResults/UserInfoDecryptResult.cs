using Abp;
using AbpCompanyName.AbpProjectName.Members;

namespace AbpCompanyName.AbpProjectName.Wechat.DecryptResults
{
    public class UserInfoDecryptResult : DecryptResult
    {
        public string OpenId { get; set; }
        public string NickName { get; set; }
        public int Gender { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string AvatarUrl { get; set; }
        public string UnionId { get; set; }

        public void SetTo(MemberUser member)
        {
            Check.NotNull(member, nameof(member));

            member.NickName = NickName;
            member.Gender = Gender == 1 ? AbpProjectName.Gender.Male : AbpProjectName.Gender.Female;
            member.HeadLogo = AvatarUrl;
            member.City = City;
            member.Province = Province;
            member.Country = Country;
            member.UnionId = UnionId;
        }
    }
}
