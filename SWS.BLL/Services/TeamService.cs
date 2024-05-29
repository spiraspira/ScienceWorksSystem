namespace SWS.BLL.Services;

public class TeamService(ITeamRepository repository, IMapper mapper) : GenericService<TeamModel, Team>(repository, mapper), ITeamService
{
	public async Task<IEnumerable<TeamModel>> GetTeamsOfTeacher(Guid teacherId)
	{
		var teams = await repository.GetTeamsOfTeacher(teacherId);

		return mapper.Map<IEnumerable<TeamModel>>(teams);
	}

	public async Task<IEnumerable<TeamModel>> GetTeamsOfStudent(Guid studentId)
	{
		var teams = await repository.GetTeamsOfStudent(studentId);

		return mapper.Map<IEnumerable<TeamModel>>(teams);
	}
}
