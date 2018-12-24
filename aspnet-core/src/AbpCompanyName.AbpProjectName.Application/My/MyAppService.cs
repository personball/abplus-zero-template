using System;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using AbpCompanyName.AbpProjectName.Members;
using AbpCompanyName.AbpProjectName.My.Dto;
using AbpCompanyName.AbpProjectName.Wechat;
using AbpCompanyName.AbpProjectName.Wechat.DecryptResults;

namespace AbpCompanyName.AbpProjectName.My
{
    [AbpAuthorize]
    public class MyAppService : AbpProjectNameAppServiceBase, IMyAppService
    {
        private readonly IRepository<MemberUser, long> _memberRepository;

        public MyAppService(
            IRepository<MemberUser, long> memberRepository)
        {
            _memberRepository = memberRepository;
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
    }
}
