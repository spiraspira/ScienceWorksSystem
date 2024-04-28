namespace SWS.BLL.Models;

public class NominationModel : Model
{
	public string? Name { get; set; }

	public Guid? ContestId { get; set; }

	public ContestModel? Contest { get; set; }

	public List<GradeModel> Grades { get; set; } = [];
}
