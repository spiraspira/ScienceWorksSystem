namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController(
	IMapper mapper,
	IReviewService reviewService,
	IValidator<ReviewViewModel> validator,
	IConfiguration configuration,
	IHttpContextAccessor httpContextAccessor)
	: ControllerBase
{
	[HttpGet("report/{reportId}")]
	public async Task<IEnumerable<ReviewViewModel>> GetReviewsOfReport(Guid reportId)
	{
		return mapper.Map<IEnumerable<ReviewViewModel>>(await reviewService.GetReviewsOfReport(reportId));
	}

	[HttpGet("report/{reportId}/teacher/{teacherId}")]
	public async Task<ActionResult> GetReviewsOfReportOfTeacher(Guid reportId, Guid teacherId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var teacherIdClaim = claims.FirstOrDefault(c => c.Type == "TeacherId");

		return Ok(mapper.Map<IEnumerable<ReviewViewModel>>(await reviewService.GetReviewsOfReportOfTeacher(reportId, new Guid(teacherIdClaim!.Value))));
	}

	[HttpGet("{id}")]
	public async Task<ReviewViewModel> Get(Guid id)
	{
		return mapper.Map<ReviewViewModel>(await reviewService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<ReviewViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<ReviewViewModel>>(await reviewService.GetAll());
	}

	[HttpPost]
	public async Task<ReviewViewModel> Create(ReviewViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<ReviewViewModel>(
			await reviewService.Create(mapper.Map<ReviewModel>(model)));
	}

	[HttpPut]
	public async Task<ReviewViewModel> Update(ReviewViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<ReviewViewModel>(
			await reviewService.Update(mapper.Map<ReviewModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<ReviewViewModel> Delete(Guid id)
	{
		return mapper.Map<ReviewViewModel>(await reviewService.Delete(id));
	}
}