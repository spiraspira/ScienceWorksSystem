namespace SWS.BLL.Interfaces;

public interface IContestService : IGenericService<ContestModel>
{
	Task<IEnumerable<ContestModel>> GetFinishedContests();

	Task<IEnumerable<string>> GetRolesOfTeacher(Guid contestId, Guid teacherId);

	Task<IEnumerable<ContestModel>> GetActiveContests();

	Task<IEnumerable<ContestModel>> GetFutureContests();

	Task<IEnumerable<ContestModel>> GetFinishedContestsOfStudent(Guid studentId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfStudent(Guid studentId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfInvitedTeacher(Guid teacherId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfOrganizationCommitteeMember(Guid teacherId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfProgramCommitteeMember(Guid teacherId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfOrganizationCommitteeHead(Guid teacherId);

	Task<IEnumerable<ContestModel>> GetActiveContestsOfProgramCommitteeHead(Guid teacherId);
}