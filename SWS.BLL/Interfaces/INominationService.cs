namespace SWS.BLL.Interfaces;

public interface INominationService : IGenericService<NominationModel>
{
	Task<IEnumerable<NominationModel>> GetNominationsOfContest(Guid contestId);
}
