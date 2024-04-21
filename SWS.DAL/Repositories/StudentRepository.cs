namespace SWS.DAL.Repositories;

public class StudentRepository(ApplicationDbContext context) : GenericRepository<Student>(context)
{
	public override Task<Student?> Get(Guid id)
	{
		return Set
			.Include(student => student.User)
			.ThenInclude(user => user!.University)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Student>> GetAll()
	{
		return await Set
			.Include(student => student.User)
			.ThenInclude(user => user!.University)
			.ToListAsync();
	}
}
