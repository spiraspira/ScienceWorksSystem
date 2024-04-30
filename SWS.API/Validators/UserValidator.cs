namespace SWS.API.Validators;

public class UserValidator : AbstractValidator<UserViewModel>
{
	public UserValidator()
	{
		RuleFor(user => user.Login)
			.NotEmpty();

		RuleFor(user => user.Password)
			.NotEmpty();

		RuleFor(user => user.Name)
			.NotEmpty();

		RuleFor(user => user.IsStudent)
			.NotNull();

		RuleFor(user => user.UniversityId)
			.NotNull();
	}
}
