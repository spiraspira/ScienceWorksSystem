namespace SWS.BLL.Services;

public class GenericService<TModel, TEntity>(IGenericRepository<TEntity> repository, IMapper mapper)
	: IGenericService<TModel>
	where TModel : IModel
	where TEntity : IEntity
{
	public virtual async Task<TModel> Create(TModel model)
	{
		var entity = await repository.Create(mapper.Map<TEntity>(model));

		return mapper.Map<TModel>(entity);
	}

	public async Task<TModel> Delete(Guid id)
	{
		var entity = await repository.Delete(id);

		return mapper.Map<TModel>(entity);
	}

	public virtual async Task<TModel> Get(Guid id)
	{
		var entity = await repository.Get(id);

		return mapper.Map<TModel>(entity);
	}

	public virtual async Task<IEnumerable<TModel>> GetAll()
	{
		var entities = await repository.GetAll();

		return mapper.Map<IEnumerable<TModel>>(entities);
	}

	public async Task<TModel> Update(TModel model)
	{
		var entity = await repository.Update(mapper.Map<TEntity>(model));

		return mapper.Map<TModel>(entity);
	}
}