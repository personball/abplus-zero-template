using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.SmsSenders
{
    public class AliYunSmsSenderConfig : ISingletonDependency
    {
        public string AccessKeyId { get; set; }
        public string AccessKeySecret { get; set; }
        public string SmsEndpoint { get; set; }
        public string SignName { get; set; }
    }
}