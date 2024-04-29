namespace SWS.API.ViewModels;

public class CommitteeMemberViewModel
{
	public Guid Id { get; set; }

	public Guid? CommitteeId { get; set; }

	public Guid? TeacherId { get; set; }

	public CommitteeViewModel? Committee { get; set; }

	public TeacherViewModel? Teacher { get; set; }

	public List<ReviewViewModel> Reviews { get; set; } = [];

	public List<GradeViewModel> Grades { get; set; } = [];
}
