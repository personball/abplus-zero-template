using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Controllers
{
    /// <summary>
    /// Api控制器基类，方便按约定配置webApi，无需手动标记FromBody等
    /// </summary>
    [ApiController]
    public abstract class AbpProjectNameApiControllerBase : AbpController
    {
        protected AbpProjectNameApiControllerBase()
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
