namespace SWS.BLL.Services;

public class StudentService(IStudentRepository repository, IMapperBase mapper) : GenericService<StudentModel, Student>(repository, mapper), IStudentService
{
}
