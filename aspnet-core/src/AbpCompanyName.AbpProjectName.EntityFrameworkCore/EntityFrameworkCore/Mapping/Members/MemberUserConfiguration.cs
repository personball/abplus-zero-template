using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Members;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Mapping.Members
{
    public class MemberUserConfiguration : AbpProjectNameEntityTypeConfiguration<MemberUser>
    {
        public override void Configure(EntityTypeBuilder<MemberUser> builder)
        {
            builder.HasBaseType<User>();
        }
    }
}
