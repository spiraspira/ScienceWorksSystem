﻿namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReportController(
	IMapper mapper,
	IReportService reportService,
	IValidator<ReportViewModel> validator,
	IConfiguration configuration,
	IHttpContextAccessor httpContextAccessor)
	: ControllerBase
{
	[HttpGet("winner/nomination/{nominationId}")]
	public async Task<ReportViewModel> GetWinnerOfNomination(Guid nominationId)
	{
		return mapper.Map<ReportViewModel>(await reportService.GetWinnerOfNomination(nominationId));
	}

	[HttpGet("winner/contest/{contestId}")]
	public async Task<ReportViewModel> GetWinnerOfContest(Guid contestId)
	{
		return mapper.Map<ReportViewModel>(await reportService.GetWinnerOfContest(contestId));
	}

	[HttpGet("student/{studentId}/contest/{contestId}")]
	public async Task<ActionResult> GetReportOfStudent(Guid studentId, Guid contestId)
	{
		var authorizationHeader = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];

		if (string.IsNullOrEmpty(authorizationHeader))
		{
			return Unauthorized();
		}

		var token = authorizationHeader.ToString().Split(" ")[0];

		var claims = await JwtUtil.ValidateToken(configuration, token);

		var studentIdClaim = claims.FirstOrDefault(c => c.Type == "StudentId");

		return Ok(mapper.Map<ReportViewModel>(await reportService.GetReportOfStudent(contestId, new Guid(studentIdClaim!.Value))));
	}

	[HttpGet("contest/{contestId}")]
	public async Task<IEnumerable<ReportViewModel>> GetReportsOfContest(Guid contestId)
	{
		return mapper.Map<IEnumerable<ReportViewModel>>(await reportService.GetReportsOfContest(contestId));
	}

	[HttpGet("{id}")]
	public async Task<ReportViewModel> Get(Guid id)
	{
		return mapper.Map<ReportViewModel>(await reportService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<ReportViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<ReportViewModel>>(await reportService.GetAll());
	}

	[HttpPost]
	public async Task<ReportViewModel> Create(ReportViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<ReportViewModel>(
			await reportService.Create(mapper.Map<ReportModel>(model)));
	}

	[HttpPut]
	public async Task<ReportViewModel> Update(ReportViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<ReportViewModel>(
			await reportService.Update(mapper.Map<ReportModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<ReportViewModel> Delete(Guid id)
	{
		return mapper.Map<ReportViewModel>(await reportService.Delete(id));
	}
}