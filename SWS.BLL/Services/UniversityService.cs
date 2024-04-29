namespace SWS.BLL.Services;

public class UniversityService(IUniversityRepository repository, IMapperBase mapper) : GenericService<UniversityModel, University>(repository, mapper), IUniversityService
{
}
