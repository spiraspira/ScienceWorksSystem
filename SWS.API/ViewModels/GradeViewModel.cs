namespace SWS.API.ViewModels;

public class GradeViewModel
{
	public Guid Id { get; set; }

	public string? Text { get; set; }

	public int? ReportGrade { get; set; }

	public DateTime? Date { get; set; }

	public Guid? ReportId { get; set; }

	public Guid? ProgramCommitteeMemberId { get; set; }

	public Guid? NominationId { get; set; }

	public ReportViewModel? Report { get; set; }

	public CommitteeMemberViewModel? ProgramCommitteeMember { get; set; }

	public NominationViewModel? Nomination { get; set; }
}
