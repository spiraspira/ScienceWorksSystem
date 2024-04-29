namespace SWS.BLL.Interfaces;

public interface IReviewService : IGenericService<ReviewModel>
{
	Task<IEnumerable<ReviewModel>> GetReviewsOfReport(Guid reportId);
}