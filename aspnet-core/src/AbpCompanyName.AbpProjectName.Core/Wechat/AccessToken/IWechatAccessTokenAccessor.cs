using System.Threading.Tasks;
using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.Wechat.AccessToken
{
    public interface IWechatAccessTokenAccessor : ITransientDependency
    {
        Task<WechatAccessToken> GetToken();
    }
}
