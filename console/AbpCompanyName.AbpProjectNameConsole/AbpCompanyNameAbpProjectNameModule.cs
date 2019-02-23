using System.Reflection;
using Abp.Modules;

namespace AbpCompanyName.AbpProjectName
{
    internal class AbpCompanyNameAbpProjectNameModule : AbpModule
    {
        public override void PreInitialize()
        {
            
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }

        public override void PostInitialize()
        {
            //Abp.Dependency.IocManager.Instance.IocContainer.AddFacility<LoggingFacility>(f => f.LogUsing<NLogFactory>().WithConfig("nlog.config"));

            //var workManager = IocManager.Resolve<IBackgroundWorkerManager>();
            //workManager.Add(IocManager.Resolve<TestWorker>());
        }
    }
}