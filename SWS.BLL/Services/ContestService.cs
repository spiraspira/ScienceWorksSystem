#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class ContestService(
	IContestRepository repository,
	IReportRepository reportRepository,
	ICommitteeMemberRepository committeeMemberRepository,
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
		var contestIds = (await reportRepository.GetReportsOfStudent(studentId)).Select(r => r.ContestId).ToList();

		var contests = (await repository.GetFinishedContests()).Where(c => contestIds.Contains(c.Id));

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfStudent(Guid studentId)
	{
		var contestIds = (await reportRepository.GetReportsOfStudent(studentId)).Select(r => r.ContestId).ToList();

		var contests = (await repository.GetActiveContests()).Where(c => contestIds.Contains(c.Id));

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfInvitedTeacher(Guid teacherId)
	{
		var contests = await repository.GetActiveContestsOfTeacherAsInvited(teacherId);

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfOrganizationCommitteeMember(Guid teacherId)
	{
		var committeeIds = (await committeeMemberRepository.GetAll())
			.Where(cm => cm.TeacherId == teacherId)
			.Select(cm => cm.CommitteeId);

		var contests = (await repository.GetActiveContests())
			.Where(c => committeeIds.Contains(c.OrganizationCommitteeId));

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfProgramCommitteeMember(Guid teacherId)
	{
		var committeeIds = (await committeeMemberRepository.GetAll())
			.Where(cm => cm.TeacherId == teacherId)
			.Select(cm => cm.CommitteeId);

		var contests = (await repository.GetActiveContests())
			.Where(c => committeeIds.Contains(c.ProgramCommitteeId));

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfOrganizationCommitteeHead(Guid teacherId)
	{
		var contests = await repository.GetActiveContestsOfOrganizationCommitteeHead(teacherId);

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}

	public async Task<IEnumerable<ContestModel>> GetActiveContestsOfProgramCommitteeHead(Guid teacherId)
	{
		var contests = await repository.GetActiveContestsOfProgramCommitteeHead(teacherId);

		return mapper.Map<IEnumerable<ContestModel>>(contests);
	}
}
