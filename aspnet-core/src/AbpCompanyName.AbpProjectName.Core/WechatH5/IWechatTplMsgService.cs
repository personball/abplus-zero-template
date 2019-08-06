using System.Threading.Tasks;
using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.WechatH5
{
    public interface IWechatTplMsgService : ITransientDependency
    {
        /// <summary>
        /// 订餐推送
        /// </summary>
        /// <param name="toUser"></param>
        /// <param name="order"></param>
        /// <param name="nutritionAnalysisResult"></param>
        /// <returns></returns>
        Task DemoNotify(string demoInput);
    }
}
