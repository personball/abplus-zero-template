using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.Members.Dto;
using AbpCompanyName.AbpProjectName.MemberTags;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.Members
{
    /// <summary>
    /// 仅供后台查询会员信息
    /// </summary>
    public class MemberUserAppService : AsyncCrudAppService<MemberUser, MemberUserDto, long, PagedMemberUserResultRequestDto, CreateMemberUserDto, MemberUserDto>, IMemberUserAppService
    {

        private readonly IRepository<MemberTag> _memberTagRepository;

        public MemberUserAppService(
            IRepository<MemberTag> memberTagRepository
            , IRepository<MemberUser, long> repository)
            : base(repository)
        {
            _memberTagRepository = memberTagRepository;
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected override IQueryable<MemberUser> CreateFilteredQuery(PagedMemberUserResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), b => b.NickName.Contains(input.Keyword))
                .WhereIf(input.From.HasValue, b => b.CreationTime >= input.From.Value.LocalDateTime)
                .WhereIf(input.To.HasValue, b => b.CreationTime <= input.To.Value.LocalDateTime);
            //CreationTime是按照服务器时间存储，故表单提交的UTC时间可转为服务器LocalDateTime进行比较
        }

        /// <summary>
        /// 仅供查询使用，调用Create/Update/Delete会返回异常
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RemoteService(false)]
        public override Task<MemberUserDto> Create(CreateMemberUserDto input) => throw new NotImplementedException();

        /// <summary>
        /// 仅供查询使用，调用Create/Update/Delete会返回异常
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RemoteService(false)]
        public override Task<MemberUserDto> Update(MemberUserDto input) => throw new NotImplementedException();

        /// <summary>
        /// 仅供查询使用，调用Create/Update/Delete会返回异常
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RemoteService(false)]
        public override Task Delete(EntityDto<long> input) => throw new NotImplementedException();

        public async Task<MemberTagsDto> GetTags(EntityDto<long> input)
        {
            var tags = await _memberTagRepository.GetAll()
                .Where(t => t.MemberUserId == input.Id)
                .Select(t => t.TagId)
                .ToListAsync();
            return new MemberTagsDto
            {
                Id = input.Id,
                TagIds = tags
            };
        }

        public async Task SetTags(MemberTagsDto input)
        {
            await _memberTagRepository.DeleteAsync(t => t.MemberUserId == input.Id);
            foreach (var tag in input.TagIds)
            {
                await _memberTagRepository.InsertAsync(new MemberTag
                {
                    MemberUserId = input.Id,
                    TagId = tag
                });
            }
        }
    }
}
