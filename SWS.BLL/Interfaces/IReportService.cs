namespace SWS.BLL.Interfaces;

public interface IReportService : IGenericService<ReportModel>
{
	Task<ReportModel> GetWinnerOfNomination(Guid nominationId);

	Task<ReportModel> GetWinnerOfContest(Guid contestId);

	Task<IEnumerable<ReportModel>> GetReportsOfContest(Guid contestId);

	Task<ReportModel> GetReportOfStudent(Guid contestId, Guid studentId);
}