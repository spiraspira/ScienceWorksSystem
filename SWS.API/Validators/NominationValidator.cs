namespace SWS.API.Validators;

public class NominationValidator : AbstractValidator<NominationViewModel>
{
	public NominationValidator()
	{
		RuleFor(nomination => nomination.ContestId)
			.NotNull();

		RuleFor(nomination => nomination.Name)
			.NotEmpty();
	}
}
