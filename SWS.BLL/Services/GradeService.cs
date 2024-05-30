#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class GradeService(IGradeRepository repository, IMapper mapper) : GenericService<GradeModel, Grade>(repository, mapper), IGradeService
{
	public async Task<IEnumerable<GradeModel>> GetGradesOfReport(Guid reportId)
	{
		var grades = await repository.GetGradesOfReport(reportId);

		return mapper.Map<IEnumerable<GradeModel>>(grades);
	}

	public async Task<IEnumerable<GradeModel>> GetGradesOfNomination(Guid nominationId)
	{
		var grades = await repository.GetGradesOfNomination(nominationId);

		return mapper.Map<IEnumerable<GradeModel>>(grades);
	}
}
