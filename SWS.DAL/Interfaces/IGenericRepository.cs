namespace SWS.DAL.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : IEntity
{
	Task<TEntity?> Get(Guid id);

	Task<IEnumerable<TEntity>> GetAll();

	Task<TEntity?> Create(TEntity team);

	Task<TEntity?> Update(TEntity team);

	Task<TEntity?> Delete(Guid id);
}