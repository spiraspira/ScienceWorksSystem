namespace SWS.BLL.Models;

public class TeacherModel : Model
{
	public Guid? UserId { get; set; }

	public UserModel? User { get; set; }

	public List<TeamModel> Teams { get; set; } = [];

	public List<CommitteeModel> SubordinateCommittees { get; set; } = [];

	public List<CommitteeMemberModel> Committees { get; set; } = [];

	public List<ContestModel> InvitedContests { get; set; } = [];
}
