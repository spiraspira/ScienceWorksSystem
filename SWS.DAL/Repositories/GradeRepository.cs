namespace SWS.DAL.Repositories;

public class GradeRepository(ApplicationDbContext context) : GenericRepository<Grade>(context), IGradeRepository
{
	public async Task<IEnumerable<Grade>> GetGradesOfReport(Guid reportId)
	{
		return await Set
			.Include(grade => grade.ProgramCommitteeMember)
			.ThenInclude(member => member!.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Include(grade => grade.Nomination)
			.Where(grade => grade.ReportId == reportId)
			.OrderBy(grade => grade.Date)
			.ToListAsync();
	}

	public async Task<IEnumerable<Grade>> GetGradesOfReportAndNomination(Guid nominationId, Guid reportId)
	{
		return await Set
			.Include(grade => grade.ProgramCommitteeMember)
			.ThenInclude(member => member!.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(grade => grade.NominationId == nominationId && grade.ReportId == reportId)
			.OrderBy(grade => grade.Date)
			.ToListAsync();
	}

	public async Task<IEnumerable<Grade>> GetGradesOfReportOfTeacher(Guid reportId, Guid programCommitteeMemberId)
	{
		return await Set
			.Include(grade => grade.ProgramCommitteeMember)
			.ThenInclude(member => member!.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Include(report => report.Nomination)
			.Where(grade => grade.ReportId == reportId && grade.ProgramCommitteeMemberId == programCommitteeMemberId)
			.OrderBy(grade => grade.Date)
			.ToListAsync();
	}

	public async Task<IEnumerable<Grade>> GetGradesOfNomination(Guid nominationId)
	{
		return await Set
			.Include(grade => grade.ProgramCommitteeMember)
			.ThenInclude(member => member!.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(grade => grade.NominationId == nominationId)
			.OrderBy(grade => grade.Date)
			.ToListAsync();
	}
}
