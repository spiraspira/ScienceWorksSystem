namespace SWS.API.Validators;

public class CommitteeMemberValidator : AbstractValidator<CommitteeMemberViewModel>
{
	public CommitteeMemberValidator()
	{
		RuleFor(committeeMember => committeeMember.CommitteeId)
			.NotNull();

		RuleFor(committeeMember => committeeMember.TeacherId)
			.NotNull();
	}
}
