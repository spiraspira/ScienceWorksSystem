namespace SWS.DAL.Entities;

public class Committee : Entity
{
	public Guid? LeaderId { get; set; }

	public User? Leader { get; set; }

	public List<CommitteeMember> Members { get; set; } = [];

	public List<Contest> OrganizationContests { get; set; } = [];

	public List<Contest> ProgramContests { get; set; } = [];
}
