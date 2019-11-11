using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore.Seed;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    [DependsOn(
        typeof(AbpProjectNameCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class AbpProjectNameEntityFrameworkModule : AbpModule
    {
        private readonly AbpZeroDbMigrator<AbpProjectNameDbContext> _abpZeroDbMigrator;
        public AbpProjectNameEntityFrameworkModule(
             AbpZeroDbMigrator<AbpProjectNameDbContext> abpZeroDbMigrator)
        {
            _abpZeroDbMigrator = abpZeroDbMigrator;
        }

        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<AbpProjectNameDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        AbpProjectNameDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        AbpProjectNameDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            _abpZeroDbMigrator.CreateOrMigrateForHost();

            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}

