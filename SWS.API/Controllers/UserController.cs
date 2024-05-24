namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(
	IMapper mapper,
	IUserService userService,
	IValidator<UserViewModel> validator)
	: ControllerBase
{
	[HttpPost("login")]
	public async Task<UserViewModel> Login(string login, string password)
	{
		return mapper.Map<UserViewModel>(await userService.Login(login, password));
	}

	[HttpGet("{id}")]
	public async Task<UserViewModel> Get(Guid id)
	{
		return mapper.Map<UserViewModel>(await userService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<UserViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<UserViewModel>>(await userService.GetAll());
	}

	[HttpPost]
	public async Task<UserViewModel> Create(UserViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<UserViewModel>(
			await userService.Create(mapper.Map<UserModel>(model)));
	}

	[HttpPut]
	public async Task<UserViewModel> Update(UserViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<UserViewModel>(
			await userService.Update(mapper.Map<UserModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<UserViewModel> Delete(Guid id)
	{
		return mapper.Map<UserViewModel>(await userService.Delete(id));
	}
}