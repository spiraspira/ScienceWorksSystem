namespace SWS.BLL.Models;

public class UniversityModel : Model
{
	public string? Name { get; set; }

	public string? Location { get; set; }

	public List<UserModel> Users { get; set; } = [];
}
