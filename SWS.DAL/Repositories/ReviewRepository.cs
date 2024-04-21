namespace SWS.DAL.Repositories;

public class ReviewRepository(ApplicationDbContext context) : GenericRepository<Review>(context), IReviewRepository
{
	public async Task<IEnumerable<Review>> GetReviewsOfReport(Guid reportId)
	{
		return await Set
			.Include(review => review.OrganizationCommitteeMember)
			.Where(review => review.ReportId == reportId)
			.ToListAsync();
	}
}
