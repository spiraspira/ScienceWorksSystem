namespace SWS.DAL.Entities;

public class CommitteeMember : Entity
{
	public Guid? CommitteeId { get; set; }

	public Guid? MemberId { get; set; }

	public Committee? Committee { get; set; }

	public User? Member { get; set; }

	public List<Review> Reviews { get; set; } = [];
}
