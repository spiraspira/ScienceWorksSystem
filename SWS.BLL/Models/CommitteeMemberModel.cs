namespace SWS.BLL.Models;

public class CommitteeMemberModel : Model
{
	public Guid? CommitteeId { get; set; }

	public Guid? TeacherId { get; set; }

	public CommitteeModel? Committee { get; set; }

	public TeacherModel? Teacher { get; set; }

	public List<ReviewModel> Reviews { get; set; } = [];

	public List<GradeModel> Grades { get; set; } = [];
}
