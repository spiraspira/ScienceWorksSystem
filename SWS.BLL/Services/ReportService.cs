#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class ReportService(
	IReportRepository repository,
	IGradeRepository gradeRepository,
	IMapper mapper) : GenericService<ReportModel, Report>(repository, mapper), IReportService
{
	public async Task<ReportModel> GetWinnerOfNomination(Guid nominationId)
	{
		var grades = await gradeRepository.GetGradesOfNomination(nominationId);

		var winningReport = grades
			.GroupBy(g => g.ReportId)
			.Select(g => new
			{
				ReportId = g.Key,
				AverageGrade = g.Average(x => x.ReportGrade)
			})
			.MaxBy(g => g.AverageGrade);

		var report = await repository.Get((Guid)winningReport!.ReportId!);

		return mapper.Map<ReportModel>(report);
	}

	public async Task<ReportModel> GetWinnerOfContest(Guid contestId)
	{
		var reports = (await repository.GetReportsOfContest(contestId)).ToList();

		var winningReportId = await GetWinningReportId(reports);

		var winningReport = await repository.Get((Guid)winningReportId!);

		return mapper.Map<ReportModel>(winningReport);
	}

	public async Task<ReportModel> GetReportOfStudent(Guid contestId, Guid studentId)
	{
		var report = await repository.GetReportOfContestOfStudent(contestId, studentId);

		return mapper.Map<ReportModel>(report);
	}

	private async Task<Guid?> GetWinningReportId(IEnumerable<Report> reports)
	{
		var reportGradesSums = await Task.WhenAll(reports.Select(async report =>
		{
			var grades = await gradeRepository.GetGradesOfReport(report.Id);

			var sum = CalculateGradesSum(grades, report.InvitedTeacherGrade);

			return new
			{
				ReportId = report.Id,
				Sum = sum
			};
		}));

		return reportGradesSums.MaxBy(rgs => rgs.Sum)?.ReportId;
	}

	private static double? CalculateGradesSum(IEnumerable<Grade> grades, int? invitedTeacherGrade)
	{
		return grades.GroupBy(grade => grade.NominationId)
			.Select(group => new
			{
				NominationId = group.Key,
				AverageGrade = group.Average(g => g.ReportGrade)
			})
			.Sum(grade => grade.AverageGrade) + invitedTeacherGrade;
	}
}
