namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommitteeController(
	IMapper mapper,
	ICommitteeService committeeService,
	IValidator<CommitteeViewModel> validator)
	: ControllerBase
{
	[HttpGet("{id}")]
	public async Task<CommitteeViewModel> Get(Guid id)
	{
		return mapper.Map<CommitteeViewModel>(await committeeService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<CommitteeViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<CommitteeViewModel>>(await committeeService.GetAll());
	}

	[HttpPost]
	public async Task<CommitteeViewModel> Create(CommitteeViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<CommitteeViewModel>(
			await committeeService.Create(mapper.Map<CommitteeModel>(model)));
	}

	[HttpPut]
	public async Task<CommitteeViewModel> Update(CommitteeViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<CommitteeViewModel>(
			await committeeService.Update(mapper.Map<CommitteeModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<CommitteeViewModel> Delete(Guid id)
	{
		return mapper.Map<CommitteeViewModel>(await committeeService.Delete(id));
	}
}