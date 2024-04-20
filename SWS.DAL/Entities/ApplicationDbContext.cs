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
}