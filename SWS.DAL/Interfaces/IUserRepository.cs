namespace SWS.DAL.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
	Task<User?> Login(string login, string password);
}