﻿namespace SWS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GradeController(
	IMapper mapper,
	IGradeService gradeService,
	IValidator<GradeViewModel> validator)
	: ControllerBase
{
	[HttpGet("report/{reportId}")]
	public async Task<IEnumerable<GradeViewModel>> GetGradesOfReport(Guid reportId)
	{
		return mapper.Map<IEnumerable<GradeViewModel>>(await gradeService.GetGradesOfReport(reportId));
	}

	[HttpGet("report/{reportId}/nomination/{nominationId}")]
	public async Task<IEnumerable<GradeViewModel>> GetGradesOfReportAndNomination(Guid nominationId, Guid reportId)
	{
		return mapper.Map<IEnumerable<GradeViewModel>>(await gradeService.GetGradesOfReportAndNomination(nominationId, reportId));
	}

	[HttpGet("report/{reportId}/programCommitteeMember/{programCommitteeMemberId}")]
	public async Task<IEnumerable<GradeViewModel>> GetGradesOfReportOfTeacher(Guid reportId, Guid programCommitteeMemberId)
	{
		return mapper.Map<IEnumerable<GradeViewModel>>(await gradeService.GetGradesOfReportOfTeacher(reportId, programCommitteeMemberId));
	}

	[HttpGet("{id}")]
	public async Task<GradeViewModel> Get(Guid id)
	{
		return mapper.Map<GradeViewModel>(await gradeService.Get(id));
	}

	[HttpGet]
	public async Task<IEnumerable<GradeViewModel>> GetAll()
	{
		return mapper.Map<IEnumerable<GradeViewModel>>(await gradeService.GetAll());
	}

	[HttpPost]
	public async Task<GradeViewModel> Create(GradeViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<GradeViewModel>(
			await gradeService.Create(mapper.Map<GradeModel>(model)));
	}

	[HttpPut]
	public async Task<GradeViewModel> Update(GradeViewModel model)
	{
		await validator.ValidateAndThrowAsync(model);

		return mapper.Map<GradeViewModel>(
			await gradeService.Update(mapper.Map<GradeModel>(model)));
	}

	[HttpDelete("{id}")]
	public async Task<GradeViewModel> Delete(Guid id)
	{
		return mapper.Map<GradeViewModel>(await gradeService.Delete(id));
	}
}