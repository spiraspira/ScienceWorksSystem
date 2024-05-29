namespace SWS.BLL.Interfaces;

public interface ITeamService : IGenericService<TeamModel>
{
	Task<IEnumerable<TeamModel>> GetTeamsOfTeacher(Guid teacherId);

	Task<IEnumerable<TeamModel>> GetTeamsOfStudent(Guid studentId);
}
