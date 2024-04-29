namespace SWS.BLL.Services;

public class ReviewService(IReviewRepository repository, IMapperBase mapper) : GenericService<ReviewModel, Review>(repository, mapper), IReviewService
{
	public async Task<IEnumerable<ReviewModel>> GetReviewsOfReport(Guid reportId)
	{
		var review = await repository.GetReviewsOfReport(reportId);

		return mapper.Map<IEnumerable<ReviewModel>>(review);
	}
}
