namespace SWS.API.ViewModels;

public class UserViewModel
{
	public Guid Id { get; set; }

	public string? Login { get; set; }

	public string? Password { get; set; }

	public string? Name { get; set; }

	public bool? IsStudent { get; set; }

	public Guid? UniversityId { get; set; }

	public Guid? TeacherId { get; set; }

	public Guid? StudentId { get; set; }

	public UniversityViewModel? University { get; set; }

	public TeacherViewModel? Teacher { get; set; }

	public StudentViewModel? Student { get; set; }
}
