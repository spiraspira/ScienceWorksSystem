namespace SWS.API.ViewModels;

public class TeacherViewModel
{
	public Guid Id { get; set; }

	public Guid? UserId { get; set; }

	public UserViewModel? User { get; set; }

	public List<TeamViewModel> Teams { get; set; } = [];

	public List<CommitteeViewModel> SubordinateCommittees { get; set; } = [];

	public List<CommitteeMemberViewModel> Committees { get; set; } = [];

	public List<ContestViewModel> InvitedContests { get; set; } = [];
}
