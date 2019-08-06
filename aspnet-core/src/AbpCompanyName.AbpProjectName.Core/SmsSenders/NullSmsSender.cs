using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.SmsSenders
{
    public class NullSmsSender : ISmsSender
    {
        public Task SendAsync(string phone, string templateId, object obj)
        {
            return Task.FromResult(0);
        }
    }
}
