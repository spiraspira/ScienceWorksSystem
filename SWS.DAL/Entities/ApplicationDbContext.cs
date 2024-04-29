namespace SWS.DAL.Entities;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
	public DbSet<Committee>? Committees { get; set; }

	public DbSet<CommitteeMember>? CommitteeMembers { get; set; }

	public DbSet<Contest>? Contests { get; set; }

	public DbSet<Grade>? Grades { get; set; }

	public DbSet<Report>? Reports { get; set; }

	public DbSet<Review>? Reviews { get; set; }

	public DbSet<Student>? Students { get; set; }

	public DbSet<Teacher>? Teachers { get; set; }

	public DbSet<Team>? Teams { get; set; }

	public DbSet<University>? Universities { get; set; }

	public DbSet<User>? Users { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Committee>(entity =>
		{
			entity.HasMany(c => c.OrganizationContests)
				.WithOne(c => c.OrganizationCommittee)
				.HasForeignKey(c => c.OrganizationCommitteeId);

			entity.HasMany(c => c.ProgramContests)
				.WithOne(c => c.ProgramCommittee)
				.HasForeignKey(c => c.ProgramCommitteeId);
		});

		modelBuilder.Entity<User>(entity =>
		{
			entity.HasOne(u => u.Student)
				.WithOne(s => s.User)
				.HasForeignKey<Student>(s => s.UserId);

			entity.HasOne(u => u.Teacher)
				.WithOne(s => s.User)
				.HasForeignKey<Teacher>(s => s.UserId);
		});

		modelBuilder.Entity<Student>(entity =>
		{
			entity.HasOne(s => s.User)
				.WithOne(u => u.Student)
				.HasForeignKey<Student>(s => s.UserId);
		});

		modelBuilder.Entity<Teacher>(entity =>
		{
			entity.HasOne(s => s.User)
				.WithOne(u => u.Teacher)
				.HasForeignKey<Teacher>(s => s.UserId);
		});

		foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
		{
			relationship.DeleteBehavior = DeleteBehavior.SetNull;
		}
	}
}