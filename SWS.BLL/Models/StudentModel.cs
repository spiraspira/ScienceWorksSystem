namespace SWS.BLL.Models;

public class StudentModel : Model
{
	public Guid? UserId { get; set; }

	public UserModel? User { get; set; }

	public List<TeamModel> Teams { get; set; } = [];
}
