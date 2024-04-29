namespace SWS.API.ViewModels;

public class NominationViewModel
{
	public Guid Id { get; set; }

	public string? Name { get; set; }

	public Guid? ContestId { get; set; }

	public ContestViewModel? Contest { get; set; }

	public List<GradeViewModel> Grades { get; set; } = [];
}
