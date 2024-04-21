namespace SWS.DAL.Repositories;

public class GenericRepository<TEntity>(ApplicationDbContext context) : IGenericRepository<TEntity> where TEntity : Entity
{
	protected ApplicationDbContext Context { get; } = context;

	protected DbSet<TEntity> Set { get; } = context.Set<TEntity>();

	public virtual Task<TEntity?> Get(Guid id)
	{
		return Set.FirstOrDefaultAsync(p => p.Id == id);
	}

	public virtual async Task<IEnumerable<TEntity>> GetAll()
	{
		return await Set.ToListAsync();
	}

	public virtual async Task<TEntity?> Create(TEntity team)
	{
		team.Id = Guid.NewGuid();

		Set.Add(team);

		await Context.SaveChangesAsync();

		return team;
	}

	public virtual async Task<TEntity?> Update(TEntity team)
	{
		Context.Entry(team).State = EntityState.Modified;

		await Context.SaveChangesAsync();

		return team;
	}

	public virtual async Task<TEntity?> Delete(Guid id)
	{
		var entity = Set.FirstOrDefault(p => p.Id == id);

		if (entity is not null)
		{
			Set.Remove(entity);

			await Context.SaveChangesAsync();
		}

		return entity;
	}
}