﻿#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class GradeService(IGradeRepository repository, IMapper mapper) : GenericService<GradeModel, Grade>(repository, mapper), IGradeService
{
	public async Task<IEnumerable<GradeModel>> GetGradesOfReport(Guid reportId)
	{
		var grades = await repository.GetGradesOfReport(reportId);

		return mapper.Map<IEnumerable<GradeModel>>(grades);
	}

	public async Task<IEnumerable<GradeModel>> GetGradesOfReportAndNomination(Guid nominationId, Guid reportId)
	{
		var grades = await repository.GetGradesOfReportAndNomination(nominationId, reportId);

		return mapper.Map<IEnumerable<GradeModel>>(grades);
	}

	public async Task<IEnumerable<GradeModel>> GetGradesOfReportOfTeacher(Guid reportId, Guid programCommitteeMemberId)
	{
		var grades = await repository.GetGradesOfReportOfTeacher(reportId, programCommitteeMemberId);

		return mapper.Map<IEnumerable<GradeModel>>(grades);
	}

	public override async Task<GradeModel> Create(GradeModel model)
	{
		model.Date = DateTime.UtcNow;

		var entity = await repository.Create(mapper.Map<Grade>(model));

		return mapper.Map<GradeModel>(entity);
	}
}
