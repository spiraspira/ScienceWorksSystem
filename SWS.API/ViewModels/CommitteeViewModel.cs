namespace SWS.API.ViewModels;

public class CommitteeViewModel
{
	public Guid Id { get; set; }

	public Guid? TeacherId { get; set; }

	public TeacherViewModel? Teacher { get; set; }

	public List<CommitteeMemberViewModel> Members { get; set; } = [];

	public List<ContestViewModel> OrganizationContests { get; set; } = [];

	public List<ContestViewModel> ProgramContests { get; set; } = [];
}
