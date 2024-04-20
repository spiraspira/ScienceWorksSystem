namespace SWS.DAL.Entities;

public class Teacher : Entity
{
	public Guid? UserId { get; set; }

	public User? User { get; set; }

	public List<Team> TeamsOfTeacher { get; set; } = [];

	public List<Committee> SubordinateCommittees { get; set; } = [];

	public List<CommitteeMember> Committees { get; set; } = [];

	public List<Contest> InvitedContests { get; set; } = [];
}
