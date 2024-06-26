﻿namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(
	IMapper mapper,
	IUserService userService,
	IValidator<UserViewModel> validator,
	IConfiguration configuration,
	IHttpContextAccessor httpContextAccessor)
	: ControllerBase
{
	[HttpPost("login")]
	public async Task<IActionResult> Login(string login, string password)
	{
		var user = await userService.Login(login, password);

		if (user is null)
		{
			return Unauthorized();
		}

		var token = GenerateJwtToken(mapper.Map<UserViewModel>(user));

		var role = (bool)user.IsStudent! ? "student" : "teacher";

		var userId = user.Id;

		return Ok(new { token, role, userId });
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> Get(Guid id)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var nameIdentifierClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

		if (nameIdentifierClaim == null || Guid.Parse(nameIdentifierClaim.Value) != id)
		{
			return Forbid();
		}

		var user = await userService.Get(id);

		var userViewModel = mapper.Map<UserViewModel>(user);

		return Ok(userViewModel);
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

	private string GenerateJwtToken(UserViewModel user)
	{
		var claims = new[]
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim("IsStudent", user.IsStudent.ToString()!),
			new Claim((bool)user.IsStudent! ? "StudentId" : "TeacherId", (bool)user.IsStudent! ? user.StudentId.ToString()! : user.TeacherId.ToString()!)
		};

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("jwtSecretKey")!));

		var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var token = new JwtSecurityToken(
			claims: claims,
			expires: DateTime.MaxValue,
			signingCredentials: credentials
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}