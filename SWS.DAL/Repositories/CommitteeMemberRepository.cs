namespace SWS.DAL.Repositories;

public class CommitteeMemberRepository(ApplicationDbContext context) : GenericRepository<CommitteeMember>(context), ICommitteeMemberRepository
{
	public async Task<IEnumerable<CommitteeMember>> GetMembersOfCommittee(Guid committeeId)
	{
		return await Set
			.Include(committeeMember => committeeMember.Teacher)
			.Include(committeeMember => committeeMember.Committee)
			.Where(committeeMember => committeeMember.CommitteeId == committeeId)
			.ToListAsync();
	}
}
