using System.Threading.Tasks;
using Abp;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.WechatMini.AccessToken;
using Microsoft.AspNetCore.Hosting;

namespace AbpCompanyName.AbpProjectName.WechatH5
{
    public class WechatTplMsgService : AbpServiceBase, IWechatTplMsgService
    {
        private static IWeChatH5Api _client;

        private readonly IWebHostEnvironment _env;
        private readonly IWechatAccessTokenAccessor _wechatAccessTokenAccessor;

        public WechatTplMsgService(
           IWechatAccessTokenAccessor wechatAccessTokenAccessor,
           IWeChatH5Api client,
           IWebHostEnvironment env)
        {
            _client = client;
            _env = env;
            _wechatAccessTokenAccessor = wechatAccessTokenAccessor;

            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        public async Task DemoNotify(string demoInput)
        {
            var _config = _env.GetAppConfiguration();

            //await _client.TplMsgNotify(tokenAccessor.Token, new
            //{
            //    touser = toUser.OpenId,
            //    template_id = _config["Authentication:WechatH5:NutritionAnalysisNotifyTemplateId"],
            //    url = $"{_config["Authentication:WechatH5:ServiceAccessUri"]}/{order.OrderNumber}",
            //    data = new
            //    {
            //        first = new { value = $"尊敬的{toUser.Name}{(toUser.Gender == Gender.Female ? "女士" : "先生")}" },
            //        keyword1 = new { value = $"{order.OrderNumber}" },
            //        keyword2 = new { value = $"{order.TotalPriceInYuan.ToString("#.##")}元" },
            //        keyword3 = new { value = $"{order.CreationTime.ToString("yyyy-MM-dd HH:mm:ss")}" },
            //        remark = new
            //        {
            //            value =
            //              $"您于{order.GetFromAddress()}本次总能量摄入:\n"
            //            + $"    {totalKCal}Kcal  (推荐:{nAnalysisResult.RecommendTotalKCalRange.LowLimit}-{nAnalysisResult.RecommendTotalKCalRange.HighLimit}Kcal)\n"
            //            + $"本餐各营养素供能比例：\n"
            //            + $"    蛋白质:{nAnalysisResult.ProteinKCalRate.ToString("#.##")}%  (推荐:{nAnalysisResult.RecommendProteinKCalRateRange.LowLimit}%-{nAnalysisResult.RecommendProteinKCalRateRange.HighLimit}%)\n"
            //            + $"    脂  肪:{nAnalysisResult.FatKCalRate.ToString("#.##")}%  (推荐:{nAnalysisResult.RecommendFatKCalRateRange.LowLimit}%-{nAnalysisResult.RecommendFatKCalRateRange.HighLimit}%)\n"
            //            + $"    碳水化合物:{nAnalysisResult.CarbohydratesKCalRate.ToString("#.##")}%  (推荐:{nAnalysisResult.RecommendCarbohydratesKCalRateRange.LowLimit}%-{nAnalysisResult.RecommendCarbohydratesKCalRateRange.HighLimit}%)\n"
            //            + $"更多健康信息点击【详情】"
            //        }
            //    }
            //});
        }
    }
}
