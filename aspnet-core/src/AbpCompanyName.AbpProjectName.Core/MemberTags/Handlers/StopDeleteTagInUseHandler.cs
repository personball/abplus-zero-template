using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Events.Bus.Entities;
using Abp.Events.Bus.Handlers;
using Abp.Threading;
using AbpCompanyName.AbpProjectName.Tags;

namespace AbpCompanyName.AbpProjectName.MemberTags.Handlers
{
    public class StopDeleteTagInUseHandler : IEventHandler<EntityDeletingEventData<Tag>>, ITransientDependency
    {

        private readonly IRepository<MemberTag> _memberTagRepository;

        public StopDeleteTagInUseHandler(
            IRepository<MemberTag> memberTagRepository)
        {
            _memberTagRepository = memberTagRepository;
        }

        public void HandleEvent(EntityDeletingEventData<Tag> eventData)
        {
            if (AsyncHelper.RunSync(() => _memberTagRepository.CountAsync(t => t.TagId == eventData.Entity.Id)) > 0)
            {
                throw new AbpProjectNameBusinessException(ErrorCode.DeleteTagFailAsMemberTagInUse);
            }
        }
    }
}
