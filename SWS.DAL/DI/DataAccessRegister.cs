namespace SWS.DAL.DI;

public static class DataAccessRegister
{
	public static void AddDataAccess(this IServiceCollection services, IConfiguration config)
	{
		services.AddDbContext<ApplicationDbContext>(options =>
		{
			options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
		});

		services.AddScoped<ICommitteeMemberRepository, CommitteeMemberRepository>();

		services.AddScoped<ICommitteeRepository, CommitteeRepository>();

		services.AddScoped<IContestRepository, ContestRepository>();

		services.AddScoped<IGradeRepository, GradeRepository>();

		services.AddScoped<INominationRepository, NominationRepository>();

		services.AddScoped<IReportRepository, ReportRepository>();

		services.AddScoped<IReviewRepository, ReviewRepository>();

		services.AddScoped<IStudentRepository, StudentRepository>();

		services.AddScoped<ITeacherRepository, TeacherRepository>();

		services.AddScoped<ITeamRepository, TeamRepository>();

		services.AddScoped<IUniversityRepository, UniversityRepository>();

		services.AddScoped<IUserRepository, UserRepository>();

		services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
	}
}