#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class CommitteeMemberService(ICommitteeMemberRepository repository, IMapper mapper) : GenericService<CommitteeMemberModel, CommitteeMember>(repository, mapper), ICommitteeMemberService
{
	public async Task<IEnumerable<CommitteeMemberModel>> GetMembersOfCommittee(Guid committeeId)
	{
		var committeeMembers = await repository.GetMembersOfCommittee(committeeId);

		return mapper.Map<IEnumerable<CommitteeMemberModel>>(committeeMembers);
	}
}
