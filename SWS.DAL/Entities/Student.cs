namespace SWS.DAL.Entities;

public class Student : Entity
{
	public Guid? UserId { get; set; }

	public User? User { get; set; }

	public List<Team> Teams { get; set; } = [];
}
