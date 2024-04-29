namespace SWS.API.ViewModels;

public class ContestViewModel
{
	public Guid Id { get; set; }

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

	public CommitteeViewModel? OrganizationCommittee { get; set; }

	public CommitteeViewModel? ProgramCommittee { get; set; }

	public TeacherViewModel? InvitedTeacher { get; set; }

	public List<ReportViewModel> Reports { get; set; } = [];

	public List<NominationViewModel> Nominations { get; set; } = [];
}
