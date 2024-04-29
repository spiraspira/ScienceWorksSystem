#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class ReviewService(IReviewRepository repository, IMapper mapper) : GenericService<ReviewModel, Review>(repository, mapper), IReviewService
{
	public async Task<IEnumerable<ReviewModel>> GetReviewsOfReport(Guid reportId)
	{
		var review = await repository.GetReviewsOfReport(reportId);

		return mapper.Map<IEnumerable<ReviewModel>>(review);
	}
}
