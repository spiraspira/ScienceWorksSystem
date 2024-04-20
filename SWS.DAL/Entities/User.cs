namespace SWS.DAL.Entities;

public class User : Entity
{
	public string? Login { get; set; }

	public string? Password { get; set; }

	public string? Name { get; set; }

	public bool? IsStudent { get; set; }

	public Guid? UniversityId { get; set; }

	public University? University { get; set; }

	public List<Team> TeamsOfTeacher { get; set; } = [];

	public List<Team> TeamsOfStudent { get; set; } = [];

	public List<Committee> SubordinateCommittees { get; set; } = [];

	public List<CommitteeMember> Committees { get; set; } = [];

	public List<Contest> InvitedContests { get; set; } = [];
}
