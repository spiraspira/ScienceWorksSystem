namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReportController(
	IMapper mapper,
	IReportService reportService,
	IValidator<ReportViewModel> validator)
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
	public async Task<ReportViewModel> GetReportOfStudent(Guid studentId, Guid contestId)
	{
		return mapper.Map<ReportViewModel>(await reportService.GetReportOfStudent(contestId, studentId));
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