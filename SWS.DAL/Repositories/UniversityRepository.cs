namespace SWS.DAL.Repositories;

public class UniversityRepository(ApplicationDbContext context) : GenericRepository<University>(context), IUniversityRepository
{
}
