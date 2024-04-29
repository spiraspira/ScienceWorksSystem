namespace SWS.API.ViewModels;

public class ReviewViewModel
{
	public Guid Id { get; set; }

	public string? Text { get; set; }

	public DateTime? Date { get; set; }

	public Guid? ReportId { get; set; }

	public Guid? OrganizationCommitteeMemberId { get; set; }

	public ReportViewModel? Report { get; set; }

	public CommitteeMemberViewModel? OrganizationCommitteeMember { get; set; }
}
