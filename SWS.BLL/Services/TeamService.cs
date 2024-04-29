namespace SWS.BLL.Services;

public class TeamService(ITeamRepository repository, IMapper mapper) : GenericService<TeamModel, Team>(repository, mapper), ITeamService
{
}
