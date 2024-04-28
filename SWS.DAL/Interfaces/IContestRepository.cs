namespace SWS.DAL.Interfaces;

public interface IContestRepository : IGenericRepository<Contest>
{
	Task<IEnumerable<Contest>> GetActiveContests();

	Task<IEnumerable<Contest>> GetFinishedContests();

	Task<IEnumerable<Contest>> GetFutureContests();

	Task<IEnumerable<Contest>> GetActiveContestsOfTeacherAsInvited(Guid teacherId);

	Task<IEnumerable<Contest>> GetFinishedContestsOfTeacherAsInvited(Guid teacherId);
}
