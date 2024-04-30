namespace SWS.API.Validators;

public class ReviewValidator : AbstractValidator<ReviewViewModel>
{
	public ReviewValidator()
	{
		RuleFor(nomination => nomination.Text)
			.NotEmpty();

		RuleFor(nomination => nomination.ReportId)
			.NotNull();

		RuleFor(nomination => nomination.OrganizationCommitteeMemberId)
			.NotNull();
	}
}
