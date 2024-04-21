namespace SWS.BLL.Models;

public class UserModel : Model
{
	public string? Login { get; set; }

	public string? Password { get; set; }

	public string? Name { get; set; }

	public bool? IsStudent { get; set; }

	public Guid? UniversityId { get; set; }

	public Guid? TeacherId { get; set; }

	public Guid? StudentId { get; set; }

	public UniversityModel? University { get; set; }

	public TeacherModel? Teacher { get; set; }

	public StudentModel? Student { get; set; }
}
