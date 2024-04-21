namespace SWS.DAL.Interfaces;

public interface IReviewRepository : IGenericRepository<Review>
{
	Task<IEnumerable<Review>> GetReviewsOfReport(Guid reportId);
}