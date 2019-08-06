using System.Text;
using System.Threading.Tasks;
using Abp.Extensions;
using Abp.Json;
using Aliyun.Acs.Core;
using Aliyun.Acs.Core.Exceptions;
using Aliyun.Acs.Core.Http;
using Aliyun.Acs.Core.Profile;
using Castle.Core.Logging;

namespace AbpCompanyName.AbpProjectName.SmsSenders
{
    public class AliYunSmsSender : ISmsSender
    {
        private readonly AliYunSmsSenderConfig _config;
        public ILogger Logger { get; set; }
        public AliYunSmsSender(AliYunSmsSenderConfig config)
        {
            _config = config;
            Logger = NullLogger.Instance;
        }

        public async Task SendAsync(string phone, string templateId, object obj)
        {
            if (_config.AccessKeyId.IsNullOrWhiteSpace() || _config.AccessKeySecret.IsNullOrWhiteSpace())
            {
                Logger.Warn($"Using AliYunSmsSender, but not config well!");
                return;
            }

            IClientProfile profile = DefaultProfile.GetProfile("default", _config.AccessKeyId, _config.AccessKeySecret);
            DefaultAcsClient client = new DefaultAcsClient(profile);
            CommonRequest request = new CommonRequest();
            request.Method = MethodType.POST;
            request.Domain = _config.SmsEndpoint;
            request.Version = "2017-05-25";
            request.Action = "SendSms";
            // request.Protocol = ProtocolType.HTTP;
            request.AddQueryParameters("PhoneNumbers", phone);
            request.AddQueryParameters("SignName", _config.SignName);//短信签名
            request.AddQueryParameters("TemplateCode", templateId);
            request.AddQueryParameters("TemplateParam", obj.ToJsonString());//json字符串
            try
            {
                CommonResponse response = client.GetCommonResponse(request);
                Logger.Debug(Encoding.Default.GetString(response.HttpResponse.Content));
            }
            catch (ServerException e)
            {
                Logger.Error($"AliYunSmsSender ServerException:{e.Message}", e);
            }
            catch (ClientException e)
            {
                Logger.Error($"AliYunSmsSender ClientException:{e.Message}", e);
            }

        }
    }
}
