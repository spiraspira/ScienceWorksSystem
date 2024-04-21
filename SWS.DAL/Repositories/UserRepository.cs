namespace SWS.DAL.Repositories;

public class UserRepository(ApplicationDbContext context) : GenericRepository<User>(context), IUserRepository
{
	public override async Task<User?> Create(User user)
	{
		if (!await IsLoginUnique(user.Login))
		{
			return null;
		}

		user.Id = Guid.NewGuid();

		Set.Add(user);

		await Context.SaveChangesAsync();

		Context.Entry(user).State = EntityState.Detached;

		return user;
	}

	public override async Task<User?> Update(User user)
	{
		var currentLogin = (await Set
		.AsNoTracking()
			.FirstOrDefaultAsync(p => p.Id == user.Id))!.Login;

		if (!await IsLoginUnique(user.Login, currentLogin))
		{
			return null;
		}

		Context.Entry(user).State = EntityState.Modified;

		await Context.SaveChangesAsync();

		Context.Entry(user).State = EntityState.Detached;

		return user;
	}

	public Task<User?> Login(string login, string password)
	{
		return Set
			.Include(user => user.University)
			.AsNoTracking()
			.FirstOrDefaultAsync(user => user.Login == login && user.Password == password);
	}

	private async Task<bool> IsLoginUnique(string? login, string? exception = "")
	{
		var user = await Set
			.AsNoTracking()
			.FirstOrDefaultAsync(user => user.Login == login);

		return user == null || user.Login == exception;
	}
}
