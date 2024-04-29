namespace SWS.BLL.Services;

public class TeacherService(ITeacherRepository repository, IMapperBase mapper) : GenericService<TeacherModel, Teacher>(repository, mapper), ITeacherService
{
}
