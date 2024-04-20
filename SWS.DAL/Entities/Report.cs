namespace SWS.DAL.Entities;

public class Report : Entity
{
	public string? Name { get; set; }

	public byte[]? File { get; set; }

	public DateTime? DateUploaded { get; set; }

	public DateTime? DateUpdated { get; set; }

	public bool? IsAccepted { get; set; }

	public int? Grade { get; set; }

	public string? InvitedTeacherReview { get; set; }

	public int? InvitedTeacherGrade { get; set; }

	public Guid? TeamId { get; set; }

	public Guid? ContestId { get; set; }

	public Team? Team { get; set; }

	public Contest? Contest { get; set; }

	public List<Review> Review { get; set; } = [];
}
