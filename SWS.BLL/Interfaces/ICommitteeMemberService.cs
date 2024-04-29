namespace SWS.BLL.Interfaces;

public interface ICommitteeMemberService : IGenericService<CommitteeMemberModel>
{
	Task<IEnumerable<CommitteeMemberModel>> GetMembersOfCommittee(Guid committeeId);
}
