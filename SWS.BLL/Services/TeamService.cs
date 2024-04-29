namespace SWS.BLL.Services;

public class TeamService(ITeamRepository repository, IMapperBase mapper) : GenericService<TeamModel, Team>(repository, mapper), ITeamService
{
}
