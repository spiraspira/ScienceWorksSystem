namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeacherController(
	IMapper mapper,
	ITeacherService teacherService,
	IValidator<TeacherViewModel> validator)
	: ControllerBase
{
	[HttpGet("{id}")]
	public async Task<TeacherViewModel> Get(Guid id)
	{
		return mapper.Map<TeacherViewModel>(await teacherService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<TeacherViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<TeacherViewModel>>(await teacherService.GetAll());
	}

	[HttpPost]
	public async Task<TeacherViewModel> Create(TeacherViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<TeacherViewModel>(
			await teacherService.Create(mapper.Map<TeacherModel>(model)));
	}

	[HttpPut]
	public async Task<TeacherViewModel> Update(TeacherViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<TeacherViewModel>(
			await teacherService.Update(mapper.Map<TeacherModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<TeacherViewModel> Delete(Guid id)
	{
		return mapper.Map<TeacherViewModel>(await teacherService.Delete(id));
	}
}