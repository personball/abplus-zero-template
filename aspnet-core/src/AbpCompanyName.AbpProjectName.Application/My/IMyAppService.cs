using System.Threading.Tasks;
using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.My.Dto;

namespace AbpCompanyName.AbpProjectName.My
{
    public interface IMyAppService : IApplicationService
    {
        Task SyncWechatUserInfo(WechatUserInfoInput input);
    }
}
