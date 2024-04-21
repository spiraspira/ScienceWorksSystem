namespace SWS.DAL.Repositories;

public class TeacherRepository(ApplicationDbContext context) : GenericRepository<Teacher>(context)
{
	public override Task<Teacher?> Get(Guid id)
	{
		return Set
			.Include(teacher => teacher.User)
			.ThenInclude(user => user!.University)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Teacher>> GetAll()
	{
		return await Set
			.Include(teacher => teacher.User)
			.ThenInclude(user => user!.University)
			.ToListAsync();
	}
}
