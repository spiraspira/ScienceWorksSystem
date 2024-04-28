namespace SWS.DAL.Entities;

public class Nomination : Entity
{
	public string? Name { get; set; }

	public Guid? ContestId { get; set; }

	public Contest? Contest { get; set; }

	public List<Grade> Grades { get; set; } = [];
}