namespace SWS.DAL.Repositories;

public class ReviewRepository(ApplicationDbContext context) : GenericRepository<Review>(context), IReviewRepository
{
	public async Task<IEnumerable<Review>> GetReviewsOfReport(Guid reportId)
	{
		return await Set
			.Include(review => review.OrganizationCommitteeMember)
			.ThenInclude(committeeMember => committeeMember!.Teacher)
			.ThenInclude(teacher => teacher!.User)
			.Where(review => review.ReportId == reportId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Review>> GetReviewsOfReportOfTeacher(Guid reportId, Guid teacherId)
	{
		return await Set
			.Include(review => review.OrganizationCommitteeMember)
			.ThenInclude(committeeMember => committeeMember!.Teacher)
			.Where(review => review.ReportId == reportId && review.OrganizationCommitteeMember!.Teacher!.Id == teacherId)
			.ToListAsync();
	}
}
