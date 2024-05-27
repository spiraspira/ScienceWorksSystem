namespace SWS.DAL.Repositories;

public class CommitteeRepository(ApplicationDbContext context) : GenericRepository<Committee>(context), ICommitteeRepository
{
	public override Task<Committee?> Get(Guid id)
	{
		return Set
			.Include(committee => committee.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Committee>> GetAll()
	{
		return await Set
			.Include(committee => committee.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.ToListAsync();
	}
}
