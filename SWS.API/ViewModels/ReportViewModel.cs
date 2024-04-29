namespace SWS.API.ViewModels;

public class ReportViewModel
{
	public Guid Id { get; set; }

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

	public TeamViewModel? Team { get; set; }

	public ContestViewModel? Contest { get; set; }

	public List<ReviewViewModel> Reviews { get; set; } = [];

	public List<GradeViewModel> Grades { get; set; } = [];
}
