namespace SWS.BLL.Interfaces;

public interface IGenericService<TModel> where TModel : IModel
{
	Task<TModel> Get(Guid id);

	Task<IEnumerable<TModel>> GetAll();

	Task<TModel> Create(TModel model);

	Task<TModel> Update(TModel model);

	Task<TModel> Delete(Guid id);
}