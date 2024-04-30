namespace SWS.API.Validators;

public class ReviewValidator : AbstractValidator<ReviewViewModel>
{
	public ReviewValidator()
	{
		RuleFor(review => review.Text)
			.NotEmpty();

		RuleFor(review => review.ReportId)
			.NotNull();

		RuleFor(review => review.OrganizationCommitteeMemberId)
			.NotNull();
	}
}
