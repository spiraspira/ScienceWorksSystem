#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class UserService(IUserRepository repository, IMapperBase mapper) : GenericService<UserModel, User>(repository, mapper), IUserService
{
	public async Task<UserModel> Login(string login, string password)
	{
		var user = await repository.Login(login, password);

		var userModel = mapper.Map<UserModel>(user);

		return userModel;
	}
}
