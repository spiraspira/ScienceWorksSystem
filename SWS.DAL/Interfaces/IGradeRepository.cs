namespace SWS.DAL.Interfaces;

public interface IGradeRepository : IGenericRepository<Grade>
{
	Task<IEnumerable<Grade>> GetGradesOfReport(Guid reportId);

	Task<IEnumerable<Grade>> GetGradesOfReportAndNomination(Guid nominationId, Guid reportId);

	Task<IEnumerable<Grade>> GetGradesOfReportOfTeacher(Guid reportId, Guid programCommitteeMemberId);

	Task<IEnumerable<Grade>> GetGradesOfNomination(Guid nominationId);
}