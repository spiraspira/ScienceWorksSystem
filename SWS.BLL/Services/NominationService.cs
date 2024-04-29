#pragma warning disable CS9107 // Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.
namespace SWS.BLL.Services;

public class NominationService(INominationRepository repository, IMapperBase mapper) : GenericService<NominationModel, Nomination>(repository, mapper), INominationService
{
	public async Task<IEnumerable<NominationModel>> GetNominationsOfContest(Guid contestId)
	{
		var entities = await repository.GetNominationsOfContest(contestId);

		return mapper.Map<IEnumerable<NominationModel>>(entities);
	}
}
