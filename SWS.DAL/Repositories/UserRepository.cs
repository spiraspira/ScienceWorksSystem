namespace SWS.DAL.Repositories;

public class UserRepository(ApplicationDbContext context) : GenericRepository<User>(context), IUserRepository
{
	public override async Task<User?> Create(User team)
	{
		if (!await IsLoginUnique(team.Login))
		{
			return null;
		}

		team.Id = Guid.NewGuid();

		Set.Add(team);

		await Context.SaveChangesAsync();

		return team;
	}

	public override async Task<User?> Update(User team)
	{
		var currentLogin = (await Set
			.FirstOrDefaultAsync(p => p.Id == team.Id))!.Login;

		if (!await IsLoginUnique(team.Login, currentLogin))
		{
			return null;
		}

		Context.Entry(team).State = EntityState.Modified;

		await Context.SaveChangesAsync();

		return team;
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
