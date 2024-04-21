namespace SWS.BLL.Models;

public class GradeModel : Model
{
	public string? Text { get; set; }

	public int? ReportGrade { get; set; }

	public DateTime? Date { get; set; }

	public Guid? ReportId { get; set; }

	public Guid? ProgramCommitteeMemberId { get; set; }

	public ReportModel? Report { get; set; }

	public CommitteeMemberModel? ProgramCommitteeMember { get; set; }
}
