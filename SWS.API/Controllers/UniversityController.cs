namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UniversityController(
	IMapper mapper,
	IUniversityService universityService,
	IValidator<UniversityViewModel> validator)
	: ControllerBase
{
	[HttpGet("{id}")]
	public async Task<UniversityViewModel> Get(Guid id)
	{
		return mapper.Map<UniversityViewModel>(await universityService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<UniversityViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<UniversityViewModel>>(await universityService.GetAll());
	}

	[HttpPost]
	public async Task<UniversityViewModel> Create(UniversityViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<UniversityViewModel>(
			await universityService.Create(mapper.Map<UniversityModel>(model)));
	}

	[HttpPut]
	public async Task<UniversityViewModel> Update(UniversityViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<UniversityViewModel>(
			await universityService.Update(mapper.Map<UniversityModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<UniversityViewModel> Delete(Guid id)
	{
		return mapper.Map<UniversityViewModel>(await universityService.Delete(id));
	}
}