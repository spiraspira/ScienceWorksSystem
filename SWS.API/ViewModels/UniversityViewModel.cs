namespace SWS.API.ViewModels;

public class UniversityViewModel
{
	public Guid Id { get; set; }

	public string? Name { get; set; }

	public string? Location { get; set; }

	public List<UserViewModel> Users { get; set; } = [];
}
