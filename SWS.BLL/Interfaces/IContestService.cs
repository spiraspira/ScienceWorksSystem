namespace SWS.BLL.Interfaces;

public interface IContestService : IGenericService<ContestModel>
{
	Task<IEnumerable<ContestModel>> GetFinishedContests();

	Task<IEnumerable<ContestModel>> GetActiveContests();

	Task<IEnumerable<ContestModel>> GetFutureContests();

	Task<IEnumerable<ContestModel>> GetFinishedContestsOfStudent(Guid studentId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfStudent(Guid studentId);
}