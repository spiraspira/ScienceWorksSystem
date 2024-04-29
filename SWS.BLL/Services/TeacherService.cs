namespace SWS.BLL.Services;

public class TeacherService(ITeacherRepository repository, IMapper mapper) : GenericService<TeacherModel, Teacher>(repository, mapper), ITeacherService
{
}
