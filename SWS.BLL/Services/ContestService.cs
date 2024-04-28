#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class ContestService(
	IContestRepository repository,
	IReportRepository reportRepository,
	IMapperBase mapper) : GenericService<ContestModel, Contest>(repository, mapper), IContestService
{
	public async Task<IEnumerable<ContestModel>> GetFinishedContests()
	{
		var entities = await repository.GetFinishedContests();

		return mapper.Map<IEnumerable<ContestModel>>(entities);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContests()
	{
		var entities = await repository.GetActiveContests();

		return mapper.Map<IEnumerable<ContestModel>>(entities);
	}

	public async Task<IEnumerable<ContestModel>> GetFutureContests()
	{
		var entities = await repository.GetFutureContests();

		return mapper.Map<IEnumerable<ContestModel>>(entities);
	}

	public async Task<IEnumerable<ContestModel>> GetFinishedContestsOfStudent(Guid studentId)
	{
		var contestIds = (await reportRepository.GetRatedReportsOfStudent(studentId)).Select(r => r.ContestId).ToList();

		var contests = (await repository.GetFinishedContests()).Where(c => contestIds.Contains(c.Id));

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfStudent(Guid studentId)
	{
		var contestIds = (await reportRepository.GetRatedReportsOfStudent(studentId)).Select(r => r.ContestId).ToList();

		var contests = (await repository.GetActiveContests()).Where(c => contestIds.Contains(c.Id));

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}
}
