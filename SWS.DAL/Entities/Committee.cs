namespace SWS.DAL.Entities;

public class Committee : Entity
{
	public Guid? LeaderId { get; set; }

	public User? Leader { get; set; }
}
