namespace SWS.API.Validators;

public class TeamValidator : AbstractValidator<TeamViewModel>
{
	public TeamValidator()
	{
		RuleFor(team => team.StudentId)
			.NotNull();

		RuleFor(team => team.TeacherId)
			.NotNull();
	}
}
