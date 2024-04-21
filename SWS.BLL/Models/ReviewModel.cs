namespace SWS.BLL.Models;

public class ReviewModel : Model
{
	public string? Text { get; set; }

	public DateTime? Date { get; set; }

	public Guid? ReportId { get; set; }

	public Guid? OrganizationCommitteeMemberId { get; set; }

	public ReportModel? Report { get; set; }

	public CommitteeMemberModel? OrganizationCommitteeMember { get; set; }
}
