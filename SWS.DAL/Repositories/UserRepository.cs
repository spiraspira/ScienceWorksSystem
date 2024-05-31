namespace SWS.DAL.Repositories;

public class UserRepository(ApplicationDbContext context) : GenericRepository<User>(context), IUserRepository
{
	public override async Task<User?> Create(User entity)
	{
		if (!await IsLoginUnique(entity.Login))
		{
			return null;
		}

		entity.Id = Guid.NewGuid();

		Set.Add(entity);

		await Context.SaveChangesAsync();

		Context.Entry(entity).State = EntityState.Detached;

		return entity;
	}

	public override async Task<User?> Update(User entity)
	{
		var currentUser = await Set.FindAsync(entity.Id);

		var currentLogin = (await Set
			.FirstOrDefaultAsync(p => p.Id == entity.Id))!.Login;

		if (!await IsLoginUnique(entity.Login, currentLogin))
		{
			return null;
		}

		currentUser!.Name = entity.Name;
		currentUser.Login = entity.Login;
		currentUser.Password = entity.Password;
		currentUser.StudentId = entity.StudentId;
		currentUser.TeacherId = entity.TeacherId;
		currentUser.IsStudent = entity.IsStudent;
		currentUser.UniversityId = entity.UniversityId;

		await Context.SaveChangesAsync();

		return currentUser;
	}

	public Task<User?> Login(string login, string password)
	{
		return Set
			.Include(user => user.University)
			.FirstOrDefaultAsync(user => user.Login == login && user.Password == password);
	}

	private async Task<bool> IsLoginUnique(string? login, string? exception = "")
	{
		var user = await Set
			.FirstOrDefaultAsync(user => user.Login == login);

		return user == null || user.Login == exception;
	}
}
