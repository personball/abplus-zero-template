using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Members.Dto;

namespace AbpCompanyName.AbpProjectName.Members
{
    public interface IMemberUserAppService : IAsyncCrudAppService<MemberUserDto, long, PagedMemberUserResultRequestDto, CreateMemberUserDto, MemberUserDto>
    {
        Task<MemberTagsDto> GetTags(EntityDto<long>input);

        Task SetTags(MemberTagsDto input);
    }
}
