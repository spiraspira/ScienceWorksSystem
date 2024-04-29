namespace SWS.BLL.Services;

public class CommitteeService(ICommitteeRepository repository, IMapper mapper) : GenericService<CommitteeModel, Committee>(repository, mapper), ICommitteeService
{
}
