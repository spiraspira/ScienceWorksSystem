namespace SWS.API.ViewModels;

public class TeamViewModel
{
	public Guid Id { get; set; }

	public Guid? StudentId { get; set; }

	public Guid? TeacherId { get; set; }

	public StudentViewModel? Student { get; set; }

	public TeacherViewModel? Teacher { get; set; }

	public List<ReportViewModel> Reports { get; set; } = [];
}
