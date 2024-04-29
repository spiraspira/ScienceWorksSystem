namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NominationController(
	IMapper mapper,
	INominationService nominationService,
	IValidator<NominationViewModel> validator)
	: ControllerBase
{
	[HttpGet("contest/{contestId}")]
	public async Task<IEnumerable<NominationViewModel>> GetNominationsOfContest(Guid contestId)
	{
		return mapper.Map<IEnumerable<NominationViewModel>>(await nominationService.GetNominationsOfContest(contestId));
	}

	[HttpGet("{id}")]
	public async Task<NominationViewModel> Get(Guid id)
	{
		return mapper.Map<NominationViewModel>(await nominationService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<NominationViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<NominationViewModel>>(await nominationService.GetAll());
	}

	[HttpPost]
	public async Task<NominationViewModel> Create(NominationViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<NominationViewModel>(
			await nominationService.Create(mapper.Map<NominationModel>(model)));
	}

	[HttpPut]
	public async Task<NominationViewModel> Update(NominationViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<NominationViewModel>(
			await nominationService.Update(mapper.Map<NominationModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<NominationViewModel> Delete(Guid id)
	{
		return mapper.Map<NominationViewModel>(await nominationService.Delete(id));
	}
}