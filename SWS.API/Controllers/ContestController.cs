namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContestController(
	IMapper mapper,
	IContestService contestService,
	IValidator<ContestViewModel> validator)
	: ControllerBase
{
	[HttpGet]
	public async Task<IEnumerable<ContestViewModel>> GetFinishedContests()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetFinishedContests());
	}

	[HttpGet]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContests()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContests());
	}

	public async Task<IEnumerable<ContestViewModel>> GetFutureContests()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetFutureContests());
	}

	[HttpGet("finished/student/{studentId}")]
	public async Task<IEnumerable<ContestViewModel>> GetFinishedContestsOfStudent(Guid studentId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetFinishedContestsOfStudent(studentId));
	}

	[HttpGet("active/student/{studentId}")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContestsOfStudent(Guid studentId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfStudent(studentId));
	}

	[HttpGet("active/teacher/invited/{teacherId}")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContestsOfInvitedTeacher(Guid teacherId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfInvitedTeacher(teacherId));
	}

	[HttpGet("active/teacher/organization/member/{teacherId}")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContestsOfOrganizationCommitteeMember(Guid teacherId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfOrganizationCommitteeMember(teacherId));
	}

	[HttpGet("active/teacher/program/member/{teacherId}")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContestsOfProgramCommitteeMember(Guid teacherId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfProgramCommitteeMember(teacherId));
	}

	[HttpGet("active/teacher/organization/head/{teacherId}")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContestsOfOrganizationCommitteeHead(Guid teacherId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfOrganizationCommitteeHead(teacherId));
	}

	[HttpGet("active/teacher/program/head/{teacherId}")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContestsOfProgramCommitteeHead(Guid teacherId)
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfProgramCommitteeHead(teacherId));
	}

	[HttpGet("{id}")]
	public async Task<ContestViewModel> Get(Guid id)
	{
		return mapper.Map<ContestViewModel>(await contestService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<ContestViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetAll());
	}

	[HttpPost]
	public async Task<ContestViewModel> Create(ContestViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<ContestViewModel>(
			await contestService.Create(mapper.Map<ContestModel>(model)));
	}

	[HttpPut]
	public async Task<ContestViewModel> Update(ContestViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<ContestViewModel>(
			await contestService.Update(mapper.Map<ContestModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<ContestViewModel> Delete(Guid id)
	{
		return mapper.Map<ContestViewModel>(await contestService.Delete(id));
	}
}