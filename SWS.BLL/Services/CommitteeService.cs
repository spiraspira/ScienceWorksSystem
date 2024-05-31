namespace SWS.BLL.Services;

public class CommitteeService(ICommitteeRepository repository, IContestRepository contestRepository, IMapper mapper) : GenericService<CommitteeModel, Committee>(repository, mapper), ICommitteeService
{
	public override async Task<IEnumerable<CommitteeModel>> GetAll()
	{
		var entities = await repository.GetAll();

		var models = mapper.Map<IEnumerable<CommitteeModel>>(entities);

		var contests = await contestRepository.GetAll();

		var updatedModels = await Task.WhenAll(models.Select(async model =>
		{
			SetName(model, contests);

			return model;
		}));

		return updatedModels;
	}

	public override async Task<CommitteeModel> Get(Guid id)
	{
		var entity = await repository.Get(id);

		var model = mapper.Map<CommitteeModel>(entity);

		var contests = await contestRepository.GetAll();

		SetName(model, contests);

		return model;
	}

	private void SetName(CommitteeModel model, IEnumerable<Contest> contests)
	{
		var contest = contests.FirstOrDefault(c =>
			c.OrganizationCommitteeId == model.Id ||
			c.ProgramCommitteeId == model.Id);

		if (contest is null)
		{
			model.Name = "Не назначенный комитет";

			return;
		}

		var committeeType = contest.ProgramCommitteeId is null ? "Организационный" : "Программный";

		model.Name = $"{committeeType} комитет конкурса {contest.Name}";
	}
}
