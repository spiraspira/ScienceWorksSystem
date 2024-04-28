namespace SWS.DAL.Repositories;

public class NominationRepository(ApplicationDbContext context) : GenericRepository<Nomination>(context), INominationRepository
{
}
