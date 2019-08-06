using System.Threading.Tasks;
using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.WechatMini.AccessToken
{
    public interface IWechatAccessTokenAccessor : ITransientDependency
    {
        Task<WechatAccessToken> GetToken();
    }
}
