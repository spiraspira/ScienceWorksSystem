namespace SWS.BLL.DI;

public static class BusinessLogicRegister
{
	public static void AddBusinessLogic(this IServiceCollection services, IConfiguration config)
	{
		services.AddScoped<ICommitteeMemberService, CommitteeMemberService>();

		services.AddScoped<ICommitteeService, CommitteeService>();

		services.AddScoped<IContestService, ContestService>();

		services.AddScoped<IGradeService, GradeService>();

		services.AddScoped<INominationService, NominationService>();

		services.AddScoped<IReportService, ReportService>();

		services.AddScoped<IReviewService, ReviewService>();

		services.AddScoped<IStudentService, StudentService>();

		services.AddScoped<ITeacherService, TeacherService>();

		services.AddScoped<ITeamService, TeamService>();

		services.AddScoped<IUniversityService, UniversityService>();

		services.AddScoped<IUserService, UserService>();

		services.AddDataAccess(config);
	}
}