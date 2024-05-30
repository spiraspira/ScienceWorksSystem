namespace SWS.BLL.Interfaces;

public interface IGradeService : IGenericService<GradeModel>
{
	Task<IEnumerable<GradeModel>> GetGradesOfReport(Guid reportId);

	Task<IEnumerable<GradeModel>> GetGradesOfReportAndNomination(Guid nominationId, Guid reportId);

	Task<IEnumerable<GradeModel>> GetGradesOfReportOfTeacher(Guid reportId, Guid programCommitteeMemberId);
}