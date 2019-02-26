using System.Reflection;
using Abp;
using Abp.Modules;
using AbpCompanyName.AbpProjectName.Localization;

namespace AbpCompanyName.AbpProjectName
{
    [DependsOn(typeof(AbpKernelModule))]
    public class AbpModuleNameModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.Register<IAbpModuleNameModuleConfiguration, AbpModuleNameModuleConfiguration>();
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            AbpModuleNameLocalizationConfigurer.Configure(Configuration.Localization);
        }
    }
}
