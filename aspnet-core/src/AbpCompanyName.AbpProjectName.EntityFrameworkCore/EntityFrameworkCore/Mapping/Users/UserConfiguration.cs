using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Members;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Mapping.Users
{
    public class UserConfiguration : AbpProjectNameEntityTypeConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasDiscriminator<UserType>("UserType")
                .HasValue<User>(UserType.Backend)
                .HasValue<MemberUser>(UserType.Frontend);
        }
    }
}
