namespace SWS.BLL.Services;

public class StudentService(IStudentRepository repository, IMapper mapper) : GenericService<StudentModel, Student>(repository, mapper), IStudentService
{
}
