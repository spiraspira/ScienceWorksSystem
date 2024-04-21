namespace SWS.DAL.Interfaces;

public interface ITeamRepository : IGenericRepository<Team>
{
	Task<IEnumerable<Team>> GetTeamsOfTeacher(Guid teacherId);

	Task<IEnumerable<Team>> GetTeamsOfStudent(Guid studentId);
}
