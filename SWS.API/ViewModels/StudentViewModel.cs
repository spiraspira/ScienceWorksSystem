namespace SWS.API.ViewModels;

public class StudentViewModel
{
	public Guid Id { get; set; }

	public Guid? UserId { get; set; }

	public UserViewModel? User { get; set; }

	public List<TeamViewModel> Teams { get; set; } = [];
}
