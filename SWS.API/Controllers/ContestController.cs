namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContestController(
	IMapper mapper,
	IContestService contestService,
	IValidator<ContestViewModel> validator,
	IConfiguration configuration,
	IHttpContextAccessor httpContextAccessor)
	: ControllerBase
{
	[HttpGet("finished")]
	public async Task<IEnumerable<ContestViewModel>> GetFinishedContests()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetFinishedContests());
	}

	[HttpGet("{contestId}/teacher/{userId}")]
	public async Task<ActionResult> GetContestRoleOfTeacher(Guid contestId, Guid userId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(await contestService.GetRolesOfTeacher(contestId, new Guid(teacherIdClaim!.Value)));
	}

	[HttpGet("active")]
	public async Task<IEnumerable<ContestViewModel>> GetActiveContests()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContests());
	}

	[HttpGet("future")]
	public async Task<IEnumerable<ContestViewModel>> GetFutureContests()
	{
		return mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetFutureContests());
	}

	[HttpGet("finished/student/{studentId}")]
	public async Task<IActionResult> GetFinishedContestsOfStudent(Guid studentId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var studentIdClaim = claims.FirstOrDefault(c => c.Type == "StudentId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetFinishedContestsOfStudent(new Guid(studentIdClaim!.Value))));
	}

	[HttpGet("active/student/{studentId}")]
	public async Task<IActionResult> GetActiveContestsOfStudent(Guid studentId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var studentIdClaim = claims.FirstOrDefault(c => c.Type == "StudentId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfStudent(new Guid(studentIdClaim!.Value))));
	}

	[HttpGet("active/teacher/invited/{teacherId}")]
	public async Task<IActionResult> GetActiveContestsOfInvitedTeacher(Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfInvitedTeacher(new Guid(teacherIdClaim!.Value))));
	}

	[HttpGet("active/teacher/organization/member/{teacherId}")]
	public async Task<IActionResult> GetActiveContestsOfOrganizationCommitteeMember(Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfOrganizationCommitteeMember(new Guid(teacherIdClaim!.Value))));
	}

	[HttpGet("active/teacher/program/member/{teacherId}")]
	public async Task<IActionResult> GetActiveContestsOfProgramCommitteeMember(Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfProgramCommitteeMember(new Guid(teacherIdClaim!.Value))));
	}

	[HttpGet("active/teacher/organization/head/{teacherId}")]
	public async Task<IActionResult> GetActiveContestsOfOrganizationCommitteeHead(Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfOrganizationCommitteeHead(new Guid(teacherIdClaim!.Value))));
	}

	[HttpGet("active/teacher/program/head/{teacherId}")]
	public async Task<IActionResult> GetActiveContestsOfProgramCommitteeHead(Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<IEnumerable<ContestViewModel>>(await contestService.GetActiveContestsOfProgramCommitteeHead(new Guid(teacherIdClaim!.Value))));
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