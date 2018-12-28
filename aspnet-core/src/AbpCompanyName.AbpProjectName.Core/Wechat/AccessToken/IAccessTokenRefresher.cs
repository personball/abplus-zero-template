using System.Threading.Tasks;
using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.Wechat.AccessToken
{
    public interface IAccessTokenRefresher : ISingletonDependency
    {
        Task Refresh();
    }
}
