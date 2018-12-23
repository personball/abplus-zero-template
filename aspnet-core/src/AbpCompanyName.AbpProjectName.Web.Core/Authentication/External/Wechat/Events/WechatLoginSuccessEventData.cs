using Abp.Events.Bus;

namespace AbpCompanyName.AbpProjectName.Authentication.External.Wechat.Events
{
    public class WechatLoginSuccessEventData : EventData
    {
        public string SessionKey { get; set; }
        public string UnionId { get; set; }
        public long UserId { get; set; }
    }
}
