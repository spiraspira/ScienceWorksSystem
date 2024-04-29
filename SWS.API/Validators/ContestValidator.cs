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

		RuleFor(contest => contest.DateStartFirstTour)
			.NotNull()
			.Equal(contest => contest.DateStart);

		RuleFor(contest => contest.DateEndFirstTour)
			.NotNull()
			.GreaterThan(contest => contest.DateStartFirstTour)
			.LessThan(contest => contest.DateEnd);

		RuleFor(contest => contest.DateStartSecondTour)
			.NotNull()
			.Equal(contest => contest.DateEndFirstTour);

		RuleFor(contest => contest.DateEndSecondTour)
			.NotNull()
			.Equal(contest => contest.DateEnd);

		RuleFor(contest => contest.InvitedTeacherId)
			.NotNull();
	}
}
