namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommitteeMemberController(
	IMapper mapper,
	ICommitteeMemberService committeeMemberService,
	IValidator<CommitteeMemberViewModel> validator)
	: ControllerBase
{
	[HttpGet("committee/{committeeId}")]
	public async Task<IEnumerable<CommitteeMemberViewModel>> GetMembersOfCommittee(Guid committeeId)
	{
		return mapper.Map<IEnumerable<CommitteeMemberViewModel>>(await committeeMemberService.GetMembersOfCommittee(committeeId));
	}

	[HttpGet("{id}")]
	public async Task<CommitteeMemberViewModel> Get(Guid id)
	{
		return mapper.Map<CommitteeMemberViewModel>(await committeeMemberService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<CommitteeMemberViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<CommitteeMemberViewModel>>(await committeeMemberService.GetAll());
	}

	[HttpPost]
	public async Task<CommitteeMemberViewModel> Create(CommitteeMemberViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<CommitteeMemberViewModel>(
			await committeeMemberService.Create(mapper.Map<CommitteeMemberModel>(model)));
	}

	[HttpPut]
	public async Task<CommitteeMemberViewModel> Update(CommitteeMemberViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<CommitteeMemberViewModel>(
			await committeeMemberService.Update(mapper.Map<CommitteeMemberModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<CommitteeMemberViewModel> Delete(Guid id)
	{
		return mapper.Map<CommitteeMemberViewModel>(await committeeMemberService.Delete(id));
	}
}