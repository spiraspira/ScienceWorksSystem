namespace SWS.DAL.Interfaces;

public interface IReviewRepository : IGenericRepository<Review>
{
	Task<IEnumerable<Review>> GetReviewsOfReport(Guid reportId);

	Task<IEnumerable<Review>> GetReviewsOfReportOfTeacher(Guid reportId, Guid teacherId);
}