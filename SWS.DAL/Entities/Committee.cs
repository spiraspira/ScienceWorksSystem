namespace SWS.DAL.Entities;

public class Committee : Entity
{
	public Guid? TeacherId { get; set; }

	public Teacher? Teacher { get; set; }

	public List<CommitteeMember> Members { get; set; } = [];

	public List<Contest> OrganizationContests { get; set; } = [];

	public List<Contest> ProgramContests { get; set; } = [];
}
