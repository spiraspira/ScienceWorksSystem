namespace SWS.DAL.Repositories;

public class NominationRepository(ApplicationDbContext context) : GenericRepository<Nomination>(context), INominationRepository
{
	public async Task<IEnumerable<Nomination>> GetNominationsOfContest(Guid contestId)
	{
		return await Set
			.Where(nomination => nomination.ContestId == contestId)
			.ToListAsync();
	}
}
