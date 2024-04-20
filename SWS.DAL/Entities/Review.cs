namespace SWS.DAL.Entities;

public class Review : Entity
{
	public string? Text { get; set; }

	public DateTime? Date { get; set; }

	public Guid? ReportId { get; set; }

	public Guid? OrganizationCommitteeMemberId { get; set; }

	public Report? Report { get; set; }

	public CommitteeMember? OrganizationCommitteeMember { get; set; }
}
