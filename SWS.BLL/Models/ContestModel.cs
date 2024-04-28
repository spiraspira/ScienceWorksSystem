namespace SWS.BLL.Models;

public class ContestModel : Model
{
	public string? Name { get; set; }

	public string? Description { get; set; }

	public DateTime? DateStart { get; set; }

	public DateTime? DateEnd { get; set; }

	public DateTime? DateStartFirstTour { get; set; }

	public DateTime? DateEndFirstTour { get; set; }

	public DateTime? DateStartSecondTour { get; set; }

	public DateTime? DateEndSecondTour { get; set; }

	public Guid? OrganizationCommitteeId { get; set; }

	public Guid? ProgramCommitteeId { get; set; }

	public Guid? InvitedTeacherId { get; set; }

	public CommitteeModel? OrganizationCommittee { get; set; }

	public CommitteeModel? ProgramCommittee { get; set; }

	public TeacherModel? InvitedTeacher { get; set; }

	public List<ReportModel> Reports { get; set; } = [];

	public List<NominationModel> Nominations { get; set; } = [];
}
