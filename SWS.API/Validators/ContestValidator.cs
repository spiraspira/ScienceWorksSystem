namespace SWS.API.Validators;

public class ContestValidator : AbstractValidator<ContestViewModel>
{
	public ContestValidator()
	{
		RuleFor(contest => contest.Name)
			.NotEmpty();

		RuleFor(contest => contest.Description)
			.NotEmpty();

		RuleFor(contest => contest.DateStart)
			.NotNull()
			.LessThan(contest => contest.DateEnd);

		RuleFor(contest => contest.DateEnd)
			.NotNull()
			.GreaterThan(contest => contest.DateStart);

		RuleFor(contest => contest.DateStartSecondTour)
			.NotNull()
			.GreaterThan(contest => contest.DateStart)
			.LessThan(contest => contest.DateEnd);

		RuleFor(contest => contest.InvitedTeacherId)
			.NotNull();
	}
}
