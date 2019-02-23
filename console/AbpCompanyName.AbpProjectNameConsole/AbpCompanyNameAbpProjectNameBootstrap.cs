using Abp;

namespace AbpCompanyName.AbpProjectName
{
    internal class AbpCompanyNameAbpProjectNameBootstrap
    {
        private static readonly AbpBootstrapper _bs = AbpBootstrapper.Create<AbpCompanyNameAbpProjectNameModule>();

        public void Start()
        {
            //LogManager.Configuration = new XmlLoggingConfiguration("nlog.config");
            _bs.Initialize();
        }

        public void Stop()
        {
            _bs.Dispose();
        }
    }
}