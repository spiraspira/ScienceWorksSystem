namespace SWS.BLL.Services;

public class GradeService(IGradeRepository repository, IMapperBase mapper) : GenericService<GradeModel, Grade>(repository, mapper), IGradeService
{
	public async Task<IEnumerable<GradeModel>> GetGradesOfReport(Guid reportId)
	{
		var grades = await repository.GetGradesOfReport(reportId);

		return mapper.Map<IEnumerable<GradeModel>>(grades);
	}
}
