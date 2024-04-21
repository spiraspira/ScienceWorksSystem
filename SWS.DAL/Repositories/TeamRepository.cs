namespace SWS.DAL.Repositories;

public class TeamRepository(ApplicationDbContext context) : GenericRepository<Team>(context), ITeamRepository
{
	public override Task<Team?> Get(Guid id)
	{
		return Set
			.Include(team => team.Teacher)
			.Include(team => team.Student)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Team>> GetAll()
	{
		return await Set
			.Include(team => team.Teacher)
			.Include(team => team.Student)
			.ToListAsync();
	}

	public override async Task<Team?> Create(Team team)
	{
		if (!await IsTeamUnique(team))
		{
			return null;
		}

		team.Id = Guid.NewGuid();

		Set.Add(team);

		await Context.SaveChangesAsync();

		return team;
	}

	public override async Task<Team?> Update(Team team)
	{
		var currentTeam = await Set.FirstOrDefaultAsync(p => p.Id == team.Id);

		if (!await IsTeamUnique(team, currentTeam))
		{
			return null;
		}

		Context.Entry(team).State = EntityState.Modified;

		await Context.SaveChangesAsync();

		return team;
	}

	public async Task<IEnumerable<Team>> GetTeamsOfTeacher(Guid teacherId)
	{
		return await Set
			.Include(team => team.Teacher)
			.Include(team => team.Student)
			.Where(team => team.TeacherId == teacherId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Team>> GetTeamsOfStudent(Guid studentId)
	{
		return await Set
			.Include(team => team.Teacher)
			.Include(team => team.Student)
			.Where(team => team.StudentId == studentId)
			.ToListAsync();
	}

	private async Task<bool> IsTeamUnique(Team team, Team? exception = null)
	{
		var existingTeam = await Set
			.FirstOrDefaultAsync(existingTeam => existingTeam.StudentId == team.StudentId && existingTeam.TeacherId == team.TeacherId);

		return existingTeam == null || exception is not null && exception.StudentId == team.StudentId && exception.TeacherId == team.TeacherId;
	}
}
