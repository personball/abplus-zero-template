using System.Threading.Tasks;
using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.WechatMini.AccessToken
{
    public interface IAccessTokenRefresher : ISingletonDependency
    {
        Task Refresh();
    }
}
