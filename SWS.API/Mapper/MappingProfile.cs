namespace SWS.API.Mapper;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<CommitteeMemberModel, CommitteeMemberViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<CommitteeModel, CommitteeViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<ContestModel, ContestViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<GradeModel, GradeViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<NominationModel, NominationViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<ReportModel, ReportViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<ReviewModel, ReviewViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<StudentModel, StudentViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<TeacherModel, TeacherViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<TeamModel, TeamViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<UniversityModel, UniversityViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));

		CreateMap<UserModel, UserViewModel>()
			.ReverseMap()
			.ForAllMembers(opt => opt.NullSubstitute(null));
	}
}