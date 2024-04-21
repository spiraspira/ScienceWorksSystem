namespace SWS.DAL.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : IEntity
{
	Task<TEntity?> Get(Guid id);

	Task<IEnumerable<TEntity>> GetAll();

	Task<TEntity?> Create(TEntity user);

	Task<TEntity?> Update(TEntity entity);

	Task<TEntity?> Delete(Guid id);
}