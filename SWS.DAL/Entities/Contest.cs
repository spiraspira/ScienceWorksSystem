namespace SWS.DAL.Entities;

public class Contest : Entity
{
	public string? Name { get; set; }

	public string? Description { get; set; }

	public DateTime? DateStart { get; set; }

	public DateTime? DateEnd { get; set; }

	public Guid? OrganizationCommitteeId { get; set; }

	public Guid? ProgramCommitteeId { get; set; }

	public Guid? InvitedTeacherId { get; set; }

	public Committee? OrganizationCommittee { get; set; }

	public Committee? ProgramCommittee { get; set; }

	public User? InvitedTeacher { get; set; }
}
