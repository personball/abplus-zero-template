using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Members;
using AbpCompanyName.AbpProjectName.WechatMini;
using AbpCompanyName.AbpProjectName.WechatMini.DecryptResults;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts
{
    public class AccountAppService : AbpProjectNameAppServiceBase, IAccountAppService
    {
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly UserManager _userManager;

        private readonly IRepository<MemberUser, long> _memberRepository;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager,
            UserManager userManager,
            IRepository<MemberUser, long> memberRepository)
        {
            _userRegistrationManager = userRegistrationManager;
            _userManager = userManager;
            _memberRepository = memberRepository;
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
        /// 获取账户设置
        /// </summary>
        /// <returns></returns>
        [AbpAuthorize]
        public async Task<AccountProfileDto> GetProfile()
        {
            var user = await _userManager.GetUserByIdAsync(AbpSession.UserId.Value);

            return new AccountProfileDto
            {
                HeadLogo = user.HeadLogo,
                Name = user.Name,
                Surname = user.Surname
            };
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

        public async Task SyncWechatUserInfo(WechatUserInfoInput input)
        {
            var member = await _memberRepository.FirstOrDefaultAsync(AbpSession.UserId.Value);

            try
            {
                var userInfo = input.EncryptedData.DecryptWechatData<UserInfoDecryptResult>(input.IV, member.SessionKey);
                userInfo.SetTo(member);
            }
            catch (Exception ex)
            {
                Logger.Error($"{GetType().FullName}:微信用户信息同步失败!{ex.Message}", ex);
                throw new AbpProjectNameBusinessException(ErrorCode.WechatUserInfoSyncFail);
            }

        }

        /// <summary>
        /// 更新账户设置
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize]
        public async Task UpdateProfile(AccountProfileDto input)
        {
            var user = await _userManager.GetUserByIdAsync(AbpSession.UserId.Value);
            user.Name = input.Name;
            user.Surname = input.Surname;
            user.HeadLogo = input.HeadLogo;
            await _userManager.UpdateAsync(user);
        }
    }
}

