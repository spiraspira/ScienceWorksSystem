namespace SWS.DAL.Repositories;

public class TeamRepository(ApplicationDbContext context) : GenericRepository<Team>(context), ITeamRepository
{
	public override Task<Team?> Get(Guid id)
	{
		return Set
			.Include(team => team.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Include(team => team.Student)
			.ThenInclude(student => student!.User)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Team>> GetAll()
	{
		return await Set
			.Include(team => team.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Include(team => team.Student)
			.ThenInclude(student => student!.User)
			.ToListAsync();
	}

	public override async Task<Team?> Create(Team entity)
	{
		if (!await IsTeamUnique(entity))
		{
			return null;
		}

		entity.Id = Guid.NewGuid();

		Set.Add(entity);

		await Context.SaveChangesAsync();

		return entity;
	}

	public override async Task<Team?> Update(Team entity)
	{
		var actualTeam = await Set.FindAsync(entity.Id);

		var currentTeam = await Set.FirstOrDefaultAsync(p => p.Id == entity.Id);

		if (!await IsTeamUnique(entity, currentTeam))
		{
			return null;
		}

		actualTeam!.StudentId = entity.StudentId;
		actualTeam.TeacherId = entity.TeacherId;

		await Context.SaveChangesAsync();

		return actualTeam;
	}

	public async Task<IEnumerable<Team>> GetTeamsOfTeacher(Guid teacherId)
	{
		return await Set
			.Include(team => team.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Include(team => team.Student)
			.ThenInclude(student => student!.User)
			.Where(team => team.TeacherId == teacherId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Team>> GetTeamsOfStudent(Guid studentId)
	{
		return await Set
			.Include(team => team.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Include(team => team.Student)
			.ThenInclude(student => student!.User)
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
