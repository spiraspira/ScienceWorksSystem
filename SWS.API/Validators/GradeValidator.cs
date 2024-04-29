namespace SWS.API.Validators;

public class GradeValidator : AbstractValidator<GradeViewModel>
{
	public GradeValidator()
	{
		RuleFor(grade => grade.Text)
			.NotEmpty();

		RuleFor(grade => grade.ReportGrade)
			.NotNull()
			.InclusiveBetween(1, 5);

		RuleFor(grade => grade.ReportId)
			.NotNull();

		RuleFor(grade => grade.ProgramCommitteeMemberId)
			.NotNull();

		RuleFor(grade => grade.NominationId)
			.NotNull();
	}
}
