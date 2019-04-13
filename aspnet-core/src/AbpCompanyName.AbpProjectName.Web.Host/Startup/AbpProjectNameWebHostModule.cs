using Abp.Configuration.Startup;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Threading.BackgroundWorkers;
using Abp.Web.Models;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Web.Host.ExceptionHandling;
using AbpCompanyName.AbpProjectName.Wechat.AccessToken.BackgroundWorkers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.Web.Host.Startup
{
    [DependsOn(
       typeof(AbpProjectNameWebCoreModule))]
    public class AbpProjectNameWebHostModule : AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpProjectNameWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            // uncomment this line to see exception detail
            //Configuration.Modules.AbpWebCommon().SendAllExceptionsToClients = true;
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

            if (_appConfiguration["Authentication:Wechat:IsEnabled"].ToLower() == bool.TrueString.ToLower())
            {
                var workManager = IocManager.Resolve<IBackgroundWorkerManager>();
                workManager.Add(IocManager.Resolve<AccessTokenRefreshBackgroundWorker>());//只能部署一个实例
            }
        }
    }
}

