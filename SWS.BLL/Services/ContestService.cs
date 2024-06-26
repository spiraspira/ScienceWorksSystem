﻿#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class ContestService(
	IContestRepository repository,
	IReportRepository reportRepository,
	ICommitteeMemberRepository committeeMemberRepository,
	IMapper mapper) : GenericService<ContestModel, Contest>(repository, mapper), IContestService
{
	public async Task<IEnumerable<ContestModel>> GetFinishedContests()
	{
		var entities = await repository.GetFinishedContests();

		return mapper.Map<IEnumerable<ContestModel>>(entities);
	}

	public async Task<IEnumerable<(string, string)>> GetRolesOfTeacher(Guid contestId, Guid teacherId)
	{
		var contest = await repository.Get(contestId);

		var roles = new List<(string, string)>();

		if (contest!.InvitedTeacherId == teacherId)
		{
			roles.Add(("invited", teacherId.ToString()));
		}

		if (contest.OrganizationCommittee!.TeacherId == teacherId)
		{
			roles.Add(("organizationHead", teacherId.ToString()));
		}

		if (contest.ProgramCommittee!.TeacherId == teacherId)
		{
			roles.Add(("programHead", teacherId.ToString()));
		}

		if (contest.OrganizationCommittee!.Members.Exists(member => member.TeacherId == teacherId))
		{
			roles.Add(("organizationMember", contest.OrganizationCommittee!.Members.Where(member => member.TeacherId == teacherId)!.FirstOrDefault()!.Id.ToString()));
		}

		if (contest.ProgramCommittee!.Members.Exists(member => member.TeacherId == teacherId))
		{
			roles.Add(("programMember", contest.ProgramCommittee!.Members.Where(member => member.TeacherId == teacherId)!.FirstOrDefault()!.Id.ToString()));
		}

		return roles;
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
