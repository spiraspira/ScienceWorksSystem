namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeamController(
	IMapper mapper,
	ITeamService teamService,
	IValidator<TeamViewModel> validator,
	IConfiguration configuration,
	IHttpContextAccessor httpContextAccessor)
	: ControllerBase
{
	[HttpGet("student/{studentId}")]
	public async Task<IActionResult> GetTeamsOfStudent(Guid studentId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var studentIdClaim = claims.FirstOrDefault(c => c.Type == "StudentId");

		return Ok(mapper.Map<TeamViewModel>(await teamService.GetTeamsOfStudent(new Guid(studentIdClaim!.Value))));
	}

	[HttpGet("teacher/{teacherId}")]
	public async Task<IActionResult> GetTeamsOfTeacher(Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<TeamViewModel>(await teamService.GetTeamsOfTeacher(new Guid(teacherIdClaim!.Value))));
	}

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