namespace SWS.DAL.Interfaces;

public interface INominationRepository : IGenericRepository<Nomination>
{
	Task<IEnumerable<Nomination>> GetNominationsOfContest(Guid contestId);
}