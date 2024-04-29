namespace SWS.BLL.Interfaces;

public interface IUserService : IGenericService<UserModel>
{
	Task<UserModel> Login(string login, string password);
}
