namespace SWS.BLL.Interfaces;

public interface IReviewService : IGenericService<ReviewModel>
{
	Task<IEnumerable<ReviewModel>> GetReviewsOfReport(Guid reportId);

	Task<IEnumerable<ReviewModel>> GetReviewsOfReportOfTeacher(Guid reportId, Guid teacherId);
}