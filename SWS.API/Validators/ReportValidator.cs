namespace SWS.API.Validators;

public class ReportValidator : AbstractValidator<ReportViewModel>
{
	public ReportValidator()
	{
		RuleFor(report => report.Name)
			.NotEmpty();

		RuleFor(report => report.File)
			.NotEmpty();

		RuleFor(report => report.TeamId)
			.NotNull();

		RuleFor(report => report.ContestId)
			.NotNull();
	}
}
