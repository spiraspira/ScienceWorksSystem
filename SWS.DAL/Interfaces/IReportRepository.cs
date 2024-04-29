namespace SWS.DAL.Interfaces;

public interface IReportRepository : IGenericRepository<Report>
{
	Task<IEnumerable<Report>> GetReportsOfStudent(Guid studentId);

	Task<IEnumerable<Report>> GetReportsOfContest(Guid contestId);

	Task<IEnumerable<Report>> GetReviewedReportsOfStudent(Guid studentId);

	Task<IEnumerable<Report>> GetReviewedReportsOfContest(Guid contestId);

	Task<IEnumerable<Report>> GetRatedReportsOfStudent(Guid studentId);

	Task<IEnumerable<Report>> GetRatedReportsOfContest(Guid contestId);

	Task<Report?> GetReportOfContestOfStudent(Guid contestId, Guid studentId);
}
