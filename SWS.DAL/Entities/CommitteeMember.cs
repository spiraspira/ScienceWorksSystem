namespace SWS.DAL.Entities;

public class CommitteeMember : Entity
{
	public Guid? CommitteeId { get; set; }

	public Guid? TeacherId { get; set; }

	public Committee? Committee { get; set; }

	public Teacher? Teacher { get; set; }

	public List<Review> Reviews { get; set; } = [];

	public List<Grade> Grades { get; set; } = [];
}
