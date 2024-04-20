namespace SWS.DAL.Entities;

public class Team : Entity
{
	public Guid? StudentId { get; set; }

	public Guid? TeacherId { get; set; }

	public User? Student { get; set; }

	public Teacher? Teacher { get; set; }

	public List<Report> Reports { get; set; } = [];
}
