namespace SWS.BLL.Models;

public class CommitteeModel : Model
{
	public string? Name { get; set; }

	public Guid? TeacherId { get; set; }

	public TeacherModel? Teacher { get; set; }

	public List<CommitteeMemberModel> Members { get; set; } = [];

	public List<ContestModel> OrganizationContests { get; set; } = [];

	public List<ContestModel> ProgramContests { get; set; } = [];
}
