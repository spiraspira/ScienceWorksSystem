namespace SWS.BLL.Services;

public class CommitteeService(ICommitteeRepository repository, IMapperBase mapper) : GenericService<CommitteeModel, Committee>(repository, mapper), ICommitteeService
{
}
