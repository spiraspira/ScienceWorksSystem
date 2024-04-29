namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeamController(
	IMapper mapper,
	ITeamService teamService,
	IValidator<TeamViewModel> validator)
	: ControllerBase
{
	[HttpGet("{id}")]
	public async Task<TeamViewModel> Get(Guid id)
	{
		return mapper.Map<TeamViewModel>(await teamService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<TeamViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<TeamViewModel>>(await teamService.GetAll());
	}

	[HttpPost]
	public async Task<TeamViewModel> Create(TeamViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<TeamViewModel>(
			await teamService.Create(mapper.Map<TeamModel>(model)));
	}

	[HttpPut]
	public async Task<TeamViewModel> Update(TeamViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<TeamViewModel>(
			await teamService.Update(mapper.Map<TeamModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<TeamViewModel> Delete(Guid id)
	{
		return mapper.Map<TeamViewModel>(await teamService.Delete(id));
	}
}