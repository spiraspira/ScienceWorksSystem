namespace SWS.DAL.Entities;

public class Grade : Entity
{
	public string? Text { get; set; }

	public int? ReportGrade { get; set; }

	public DateTime? Date { get; set; }

	public Guid? ReportId { get; set; }

	public Guid? ProgramCommitteeMemberId { get; set; }

	public Guid? NominationId { get; set; }

	public Report? Report { get; set; }

	public CommitteeMember? ProgramCommitteeMember { get; set; }

	public Nomination? Nomination { get; set; }
}
