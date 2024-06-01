namespace SWS.DAL.Repositories;

public class ReportRepository(ApplicationDbContext context) : GenericRepository<Report>(context), IReportRepository
{
	public override Task<Report?> Get(Guid id)
	{
		return Set
			.Include(report => report.Contest)
			.Include(report => report.Team)
			.ThenInclude(team => team!.Teacher)
			.Include(report => report.Team)
			.ThenInclude(team => team!.Student)
			.ThenInclude(student => student!.User)
			.FirstOrDefaultAsync(p => p.Id == id);
	}

	public override async Task<Report?> Create(Report entity)
	{
		entity.Id = Guid.NewGuid();

		entity.DateUpdated = DateTime.UtcNow.ToUniversalTime();

		entity.DateUploaded = DateTime.UtcNow.ToUniversalTime();

		Set.Add(entity);

		await Context.SaveChangesAsync();

		return entity;
	}

	public override async Task<Report?> Update(Report entity)
	{
		entity.DateUpdated = DateTime.UtcNow.ToUniversalTime();

		Context.Entry(entity).State = EntityState.Modified;

		await Context.SaveChangesAsync();

		return entity;
	}

	public async Task<IEnumerable<Report>> GetReportsOfStudent(Guid studentId)
	{
		return await Set
			.Include(report => report.Contest)
			.Include(report => report.Team)
			.Where(report => report.Team!.StudentId == studentId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Report>> GetReportsOfContest(Guid contestId)
	{
		return await Set
			.Include(report => report.Team)
			.ThenInclude(team => team!.Student)
			.ThenInclude(student => student!.User)
			.Where(report => report.ContestId == contestId)
			.Include(report => report.Team)
			.ThenInclude(team => team!.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(report => report.ContestId == contestId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Report>> GetReviewedReportsOfStudent(Guid studentId)
	{
		return await Set
			.Include(report => report.Contest)
			.Include(report => report.Team)
			.Where(report => report.IsAccepted == true && report.Team!.StudentId == studentId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Report>> GetReviewedReportsOfContest(Guid contestId)
	{
		return await Set
			.Include(report => report.Team)
			.Where(report => report.IsAccepted == true && report.ContestId == contestId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Report>> GetRatedReportsOfStudent(Guid studentId)
	{
		return await Set
			.Include(report => report.Contest)
			.Include(report => report.Team)
			.Where(report => report.Grade != 0 && report.Grade != null && report.Team!.StudentId == studentId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Report>> GetRatedReportsOfContest(Guid contestId)
	{
		return await Set
			.Include(report => report.Team)
			.Where(report => report.Grade != 0 && report.Grade != null && report.ContestId == contestId)
			.ToListAsync();
	}

	public Task<Report?> GetReportOfContestOfStudent(Guid contestId, Guid studentId)
	{
		return Set
			.Include(report => report.Team)
			.Where(report => report.ContestId == contestId && report.Team!.StudentId == studentId)
			.FirstOrDefaultAsync();
	}
}
