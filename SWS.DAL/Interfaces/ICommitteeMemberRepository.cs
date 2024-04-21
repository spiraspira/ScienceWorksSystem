namespace SWS.DAL.Interfaces;

public interface ICommitteeMemberRepository : IGenericRepository<CommitteeMember>
{
	Task<IEnumerable<CommitteeMember>> GetMembersOfCommittee(Guid committeeId);
}