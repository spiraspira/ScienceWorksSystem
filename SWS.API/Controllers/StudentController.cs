namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentController(
	IMapper mapper,
	IStudentService studentService,
	IValidator<StudentViewModel> validator)
	: ControllerBase
{
	[HttpGet("{id}")]
	public async Task<StudentViewModel> Get(Guid id)
	{
		return mapper.Map<StudentViewModel>(await studentService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<StudentViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<StudentViewModel>>(await studentService.GetAll());
	}

	[HttpPost]
	public async Task<StudentViewModel> Create(StudentViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<StudentViewModel>(
			await studentService.Create(mapper.Map<StudentModel>(model)));
	}

	[HttpPut]
	public async Task<StudentViewModel> Update(StudentViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<StudentViewModel>(
			await studentService.Update(mapper.Map<StudentModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<StudentViewModel> Delete(Guid id)
	{
		return mapper.Map<StudentViewModel>(await studentService.Delete(id));
	}
}