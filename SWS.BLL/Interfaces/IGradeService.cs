namespace SWS.BLL.Interfaces;

public interface IGradeService : IGenericService<GradeModel>
{
	Task<IEnumerable<GradeModel>> GetGradesOfReport(Guid reportId);
}