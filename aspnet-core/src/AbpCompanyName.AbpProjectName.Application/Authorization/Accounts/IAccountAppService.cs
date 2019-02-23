using System.Threading.Tasks;
using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);

        Task ChangePassword(ChangePasswordInput input);

        Task<AccountProfileDto> GetProfile();

        Task UpdateProfile(AccountProfileDto input);

        Task SyncWechatUserInfo(WechatUserInfoInput input);
    }
}

