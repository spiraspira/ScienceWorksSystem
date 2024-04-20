namespace SWS.DAL.Entities;

public class User : Entity
{
	public string? Login { get; set; }

	public string? Password { get; set; }

	public string? Name { get; set; }

	public bool? IsStudent { get; set; }

	public Guid? UniversityId { get; set; }

	public University? University { get; set; }
}
