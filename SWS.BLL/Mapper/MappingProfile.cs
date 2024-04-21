namespace SWS.BLL.Mapper;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<CommitteeMember, CommitteeMemberModel>().ReverseMap();

		CreateMap<Committee, CommitteeModel>().ReverseMap();

		CreateMap<Contest, ContestModel>().ReverseMap();

		CreateMap<Grade, GradeModel>().ReverseMap();

		CreateMap<Report, ReportModel>().ReverseMap();

		CreateMap<Review, ReviewModel>().ReverseMap();

		CreateMap<Student, StudentModel>().ReverseMap();

		CreateMap<Teacher, TeacherModel>().ReverseMap();

		CreateMap<Team, TeamModel>().ReverseMap();

		CreateMap<University, UniversityModel>().ReverseMap();

		CreateMap<User, UserModel>().ReverseMap();
	}
}