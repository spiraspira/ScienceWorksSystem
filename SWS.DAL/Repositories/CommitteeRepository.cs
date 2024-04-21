namespace SWS.DAL.Repositories;

public class CommitteeRepository(ApplicationDbContext context) : GenericRepository<Committee>(context)
{
	public override Task<Committee?> Get(Guid id)
	{
		return Set
			.Include(committee => committee.Teacher)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Committee>> GetAll()
	{
		return await Set
			.Include(committee => committee.Teacher)
			.ToListAsync();
	}
}
