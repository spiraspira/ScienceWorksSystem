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

		return entity;
	}

	public override async Task<User?> Update(User entity)
	{
		var currentLogin = (await Set
			.FirstOrDefaultAsync(p => p.Id == entity.Id))!.Login;

		if (!await IsLoginUnique(entity.Login, currentLogin))
		{
			return null;
		}

		Context.Entry(entity).State = EntityState.Modified;

		await Context.SaveChangesAsync();

		return entity;
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
