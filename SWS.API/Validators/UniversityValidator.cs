namespace SWS.API.Validators;

public class UniversityValidator : AbstractValidator<UniversityViewModel>
{
	public UniversityValidator()
	{
		RuleFor(university => university.Location)
			.NotEmpty();

		RuleFor(university => university.Name)
			.NotEmpty();
	}
}
