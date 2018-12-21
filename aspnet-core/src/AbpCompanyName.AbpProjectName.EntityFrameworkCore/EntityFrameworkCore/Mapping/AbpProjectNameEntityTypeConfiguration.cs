using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Mapping
{
    public abstract class AbpProjectNameEntityTypeConfiguration<T> : IEntityTypeConfiguration<T> where T : class
    {
        public readonly IPluralizer Pluralizer;

        public AbpProjectNameEntityTypeConfiguration(IPluralizer pluralizer)
        {
            Pluralizer = pluralizer;
        }

        public abstract void Configure(EntityTypeBuilder<T> builder);
    }
}

