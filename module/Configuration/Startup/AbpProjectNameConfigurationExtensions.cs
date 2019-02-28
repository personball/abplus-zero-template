using Abp.Configuration.Startup;

namespace AbpCompanyName.AbpProjectName.Configuration.Startup
{
    public static  class AbpModuleNameConfigurationExtensions
    {
        public static IAbpModuleNameModuleConfiguration UseAbpModuleName(this IModuleConfigurations configurations)
        {
            return configurations.AbpConfiguration.GetOrCreate("Modules.AbpCompanyName.AbpProjectName.AbpModuleName", 
                () => configurations.AbpConfiguration.IocManager.Resolve<IAbpModuleNameModuleConfiguration>());
        }
    }
}
