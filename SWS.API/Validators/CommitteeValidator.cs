namespace SWS.API.Validators;

public class CommitteeValidator : AbstractValidator<CommitteeViewModel>
{
	public CommitteeValidator()
	{
		RuleFor(committee => committee.TeacherId)
			.NotNull();
	}
}
