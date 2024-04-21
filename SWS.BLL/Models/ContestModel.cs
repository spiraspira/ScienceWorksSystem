namespace SWS.BLL.Models;

public class ContestModel : Model
{
	public string? Name { get; set; }

	public string? Description { get; set; }

	public DateTime? DateStart { get; set; }

	public DateTime? DateEnd { get; set; }

	public Guid? OrganizationCommitteeId { get; set; }

	public Guid? ProgramCommitteeId { get; set; }

	public Guid? InvitedTeacherId { get; set; }

	public CommitteeModel? OrganizationCommittee { get; set; }

	public CommitteeModel? ProgramCommittee { get; set; }

	public TeacherModel? InvitedTeacher { get; set; }

	public List<ReportModel> Reports { get; set; } = [];
}
