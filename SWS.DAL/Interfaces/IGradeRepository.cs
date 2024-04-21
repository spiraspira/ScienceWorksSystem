namespace SWS.DAL.Interfaces;

public interface IGradeRepository : IGenericRepository<Grade>
{
	Task<IEnumerable<Grade>> GetGradesOfReport(Guid reportId);
}