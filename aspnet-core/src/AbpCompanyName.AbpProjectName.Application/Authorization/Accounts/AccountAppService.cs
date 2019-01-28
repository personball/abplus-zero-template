using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Configuration;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Members;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts
{
    public class AccountAppService : AbpProjectNameAppServiceBase, IAccountAppService
    {
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly UserManager _userManager;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager,
            UserManager userManager)
        {
            _userRegistrationManager = userRegistrationManager;
            _userManager = userManager;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize]
        public async Task ChangePassword(ChangePasswordInput input)
        {
            var user = await _userManager.GetUserByIdAsync(AbpSession.UserId.Value);
            var result = await _userManager.ChangePasswordAsync(user, input.CurrentPassword, input.NewPassword);

            if (!result.Succeeded)
            {
                throw new AbpProjectNameBusinessException(ErrorCode.ChangePasswordFailed, string.Join(" ", result.Errors.Select(e => e.Description)));
            }
        }

        /// <summary>
        /// TODO 获取账户设置
        /// </summary>
        /// <returns></returns>
        [AbpAuthorize]
        public async Task<AccountProfileDto> GetProfile()
        {
            var user = await _userManager.GetUserByIdAsync(AbpSession.UserId.Value);

            //user.

            throw new System.NotImplementedException();
        }

        public async Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(input.TenancyName);
            if (tenant == null)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.NotFound);
            }

            if (!tenant.IsActive)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.InActive);
            }

            return new IsTenantAvailableOutput(TenantAvailabilityState.Available, tenant.Id);
        }

        public async Task<RegisterOutput> Register(RegisterInput input)
        {
            var user = await _userRegistrationManager.RegisterAsync<MemberUser>(
                input.Name,
                input.Surname,
                input.EmailAddress,
                input.UserName,
                input.Password,
                true // Assumed email address is always confirmed. Change this if you want to implement email confirmation.
            );

            var isEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);

            return new RegisterOutput
            {
                CanLogin = user.IsActive && (user.IsEmailConfirmed || !isEmailConfirmationRequiredForLogin)
            };
        }

        /// <summary>
        /// TODO 更新账户设置
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize]
        public async Task UpdateProfile(AccountProfileDto input)
        {
            throw new System.NotImplementedException();
        }
    }
}

