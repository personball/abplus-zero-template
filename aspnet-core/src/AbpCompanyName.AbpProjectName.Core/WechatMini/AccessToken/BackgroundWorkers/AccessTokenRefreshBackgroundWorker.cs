using System;
using Abp.Dependency;
using Abp.Threading;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;

namespace AbpCompanyName.AbpProjectName.WechatMini.AccessToken.BackgroundWorkers
{
    public class AccessTokenRefreshBackgroundWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IAccessTokenRefresher _accessTokenRefresher;
        public AccessTokenRefreshBackgroundWorker(
           IAccessTokenRefresher accessTokenRefresher
            , AbpTimer timer) : base(timer)
        {
            _accessTokenRefresher = accessTokenRefresher;

            timer.RunOnStart = true;
            timer.Period = 1000 * 1800;//30分钟
        }

        protected override void DoWork()
        {
            try
            {
                AsyncHelper.RunSync(async () => await _accessTokenRefresher.Refresh());
            }
            catch (Exception ex)
            {
                Logger.Error($"[AccessTokenRefreshBackgroundWorker]Fail:{ex.Message}", ex);
            }
        }
    }
}
