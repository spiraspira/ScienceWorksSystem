namespace SWS.BLL.Models;

public class TeamModel : Model
{
	public Guid? StudentId { get; set; }

	public Guid? TeacherId { get; set; }

	public StudentModel? Student { get; set; }

	public TeacherModel? Teacher { get; set; }

	public List<ReportModel> Reports { get; set; } = [];
}
