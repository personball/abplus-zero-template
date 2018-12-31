using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.Members.Dto;

namespace AbpCompanyName.AbpProjectName.Members
{
    /// <summary>
    /// 仅供后台查询会员信息
    /// </summary>
    public class MemberUserAppService : AsyncCrudAppService<MemberUser, MemberUserDto, long, PagedMemberUserResultRequestDto, CreateMemberUserDto, MemberUserDto>, IMemberUserAppService
    {
        public MemberUserAppService(
            IRepository<MemberUser, long> repository)
            : base(repository)
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected override IQueryable<MemberUser> CreateFilteredQuery(PagedMemberUserResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), b => b.Name.Contains(input.Keyword))
                .WhereIf(input.From.HasValue, b => b.CreationTime >= input.From.Value.LocalDateTime)
                .WhereIf(input.To.HasValue, b => b.CreationTime <= input.To.Value.LocalDateTime);
            //CreationTime是按照服务器时间存储，故表单提交的UTC时间可转为服务器LocalDateTime进行比较
        }

        /// <summary>
        /// 仅供查询使用，调用Create/Update/Delete会返回异常
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Task<MemberUserDto> Create(CreateMemberUserDto input)
        {
            throw new AbpProjectNameBusinessException(ErrorCode.Forbidden);
        }

        /// <summary>
        /// 仅供查询使用，调用Create/Update/Delete会返回异常
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Task<MemberUserDto> Update(MemberUserDto input)
        {
            throw new AbpProjectNameBusinessException(ErrorCode.Forbidden);
        }

        /// <summary>
        /// 仅供查询使用，调用Create/Update/Delete会返回异常
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Task Delete(EntityDto<long> input)
        {
            throw new AbpProjectNameBusinessException(ErrorCode.Forbidden);
        }
    }
}
