using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Web.Models;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Web.Host.ExceptionHandling;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.Web.Host.Startup
{
    [DependsOn(
       typeof(AbpProjectNameWebCoreModule))]
    public class AbpProjectNameWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpProjectNameWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameWebHostModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            var errorInfoBuilder = IocManager.Resolve<IErrorInfoBuilder>();
            errorInfoBuilder.AddExceptionConverter(
                IocManager.Resolve<AbpProjectNameExceptionErrorInfoConverter>());
        }
    }
}

