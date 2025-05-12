namespace SWS.DAL.Repositories;

public class UniversityRepository(ApplicationDbContext context) : GenericRepository<University>(context), IUniversityRepository
{
	public override async Task<IEnumerable<University>> GetAll()
	{
		return await Set
			.OrderBy(u => u.Location)
			.ThenBy(u => u.Name)
			.ToListAsync();
	}
}
