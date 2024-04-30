namespace SWS.API.Validators;

public class TeacherValidator : AbstractValidator<TeacherViewModel>
{
	public TeacherValidator()
	{
		RuleFor(teacher => teacher.UserId)
			.NotNull();
	}
}
