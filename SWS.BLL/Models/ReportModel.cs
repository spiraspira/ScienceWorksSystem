namespace SWS.BLL.Models;

public class ReportModel : Model
{
	public string? Name { get; set; }

	public byte[]? File { get; set; }

	public DateTime? DateUploaded { get; set; }

	public DateTime? DateUpdated { get; set; }

	public bool? IsAccepted { get; set; }

	public int? Grade { get; set; }

	public string? InvitedTeacherReview { get; set; }

	public int? InvitedTeacherGrade { get; set; }

	public Guid? TeamId { get; set; }

	public Guid? ContestId { get; set; }

	public TeamModel? Team { get; set; }

	public ContestModel? Contest { get; set; }

	public List<ReviewModel> Reviews { get; set; } = [];

	public List<GradeModel> Grades { get; set; } = [];
}
