namespace SWS.API.Validators;

public class StudentValidator : AbstractValidator<StudentViewModel>
{
	public StudentValidator()
	{
		RuleFor(student => student.UserId)
			.NotNull();
	}
}
