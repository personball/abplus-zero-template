using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.SmsSenders
{
    public interface ISmsSender
    {
        Task SendAsync(string phone, string templateId, object obj);
    }
}
