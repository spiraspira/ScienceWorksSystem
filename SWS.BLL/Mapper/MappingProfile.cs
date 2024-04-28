namespace SWS.BLL.Mapper;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<CommitteeMember, CommitteeMemberModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Committee, CommitteeModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Contest, ContestModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Grade, GradeModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Nomination, NominationModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Report, ReportModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Review, ReviewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Student, StudentModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Teacher, TeacherModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<Team, TeamModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<University, UniversityModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<User, UserModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));
	}
}