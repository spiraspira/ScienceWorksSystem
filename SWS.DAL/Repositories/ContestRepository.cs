namespace SWS.DAL.Repositories;

public class ContestRepository(ApplicationDbContext context) : GenericRepository<Contest>(context), IContestRepository
{
	public override Task<Contest?> Get(Guid id)
	{
		return Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<IEnumerable<Contest>> GetAll()
	{
		return await Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetActiveContests()
	{
		return await Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(contest => contest.DateEnd >= DateTime.UtcNow.ToUniversalTime() && contest.DateStart <= DateTime.UtcNow.ToUniversalTime())
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetFinishedContests()
	{
		return await Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(contest => contest.DateEnd < DateTime.UtcNow.ToUniversalTime())
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetFutureContests()
	{
		return await Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(contest => contest.DateStart > DateTime.UtcNow.ToUniversalTime())
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetActiveContestsOfTeacherAsInvited(Guid teacherId)
	{
		return await Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(contest => contest.DateEnd >= DateTime.UtcNow.ToUniversalTime() && contest.DateStart <= DateTime.UtcNow.ToUniversalTime() && contest.InvitedTeacherId == teacherId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetFinishedContestsOfTeacherAsInvited(Guid teacherId)
	{
		return await Set
			.Include(contest => contest.InvitedTeacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(contest => contest.DateEnd < DateTime.UtcNow.ToUniversalTime() && contest.InvitedTeacherId == teacherId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetActiveContestsOfOrganizationCommitteeHead(Guid teacherId)
	{
		return await Set
			.Include(contest => contest.OrganizationCommittee)
			.Where(contest => contest.DateEnd >= DateTime.UtcNow.ToUniversalTime() && contest.DateStart <= DateTime.UtcNow.ToUniversalTime() && contest.OrganizationCommittee!.TeacherId == teacherId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Contest>> GetActiveContestsOfProgramCommitteeHead(Guid teacherId)
	{
		return await Set
			.Include(contest => contest.ProgramCommittee)
			.Where(contest => contest.DateEnd >= DateTime.UtcNow.ToUniversalTime() && contest.DateStart <= DateTime.UtcNow.ToUniversalTime() && contest.ProgramCommittee!.TeacherId == teacherId)
			.ToListAsync();
	}
}
