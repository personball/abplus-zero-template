using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Members.Dto;

namespace AbpCompanyName.AbpProjectName.Members
{
    public interface IMemberUserAppService : IAsyncCrudAppService<MemberUserDto, long, PagedMemberUserResultRequestDto, CreateMemberUserDto, MemberUserDto>
    {
    }
}
