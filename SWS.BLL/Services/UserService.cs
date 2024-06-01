#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class UserService(
	IUserRepository repository,
	ITeacherRepository teacherRepository,
	IStudentRepository studentRepository,
	IMapper mapper) : GenericService<UserModel, User>(repository, mapper), IUserService
{
	public async Task<UserModel> Login(string login, string password)
	{
		var user = await repository.Login(login, password);

		var userModel = mapper.Map<UserModel>(user);

		return userModel;
	}

	public override async Task<UserModel> Create(UserModel model)
	{
		var entity = await repository.Create(mapper.Map<User>(model));

		if (entity is null)
		{
			return mapper.Map<UserModel>(entity);
		}

		if (entity.IsStudent == true)
		{
			var student = new StudentModel
			{
				UserId = entity.Id
			};

			var newStudent = await studentRepository.Create(mapper.Map<Student>(student));

			entity.StudentId = newStudent!.Id;
		}
		else
		{
			var teacher = new TeacherModel
			{
				UserId = entity.Id
			};

			var newTeacher = await teacherRepository.Create(mapper.Map<Teacher>(teacher));

			entity.TeacherId = newTeacher!.Id;
		}

		entity = await repository.Update(entity);

		return mapper.Map<UserModel>(entity);
	}
}
