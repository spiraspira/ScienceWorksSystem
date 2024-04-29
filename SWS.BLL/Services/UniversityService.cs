namespace SWS.BLL.Services;

public class UniversityService(IUniversityRepository repository, IMapper mapper) : GenericService<UniversityModel, University>(repository, mapper), IUniversityService
{
}
