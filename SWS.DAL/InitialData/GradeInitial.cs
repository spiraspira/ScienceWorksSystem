#pragma warning disable S6562
namespace SWS.DAL.InitialData;

public static class GradeInitial
{
	public static readonly List<Grade> Grades =
	[
		new Grade
		{
			Id = new Guid("ac5c7a8d-ea23-4cfe-9613-e03040e78e8e"),
			Text = "GradeText1_1_1",
			ReportGrade = 6,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			ProgramCommitteeMemberId = new Guid("9f5618e2-2a9b-45bb-9655-8a6b635e477b"),
			NominationId = new Guid("48cfadc1-877b-4df3-bd42-a13388bad389"),
		},

		new Grade
		{
			Id = new Guid("1df1a017-c125-45e0-a082-877cc4ebea0e"),
			Text = "GradeText1_1_2",
			ReportGrade = 7,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			ProgramCommitteeMemberId = new Guid("54709833-c459-4dbf-b1c5-bbecd4cb8be0"),
			NominationId = new Guid("48cfadc1-877b-4df3-bd42-a13388bad389"),
		},

		new Grade
		{
			Id = new Guid("6756349c-53dd-40d0-be09-266bdf38d297"),
			Text = "GradeText1_2_1",
			ReportGrade = 8,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			ProgramCommitteeMemberId = new Guid("9f5618e2-2a9b-45bb-9655-8a6b635e477b"),
			NominationId = new Guid("d74e442a-de93-4c28-bb51-c47335c48c7b"),
		},

		new Grade
		{
			Id = new Guid("7036a586-dbff-46cb-8bdf-e6efa3a004d7"),
			Text = "GradeText1_2_2",
			ReportGrade = 9,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			ProgramCommitteeMemberId = new Guid("54709833-c459-4dbf-b1c5-bbecd4cb8be0"),
			NominationId = new Guid("d74e442a-de93-4c28-bb51-c47335c48c7b"),
		},

		new Grade
		{
			Id = new Guid("c658c7d2-f5d5-4107-8d64-d6a934821e77"),
			Text = "GradeText1_3_1",
			ReportGrade = 10,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			ProgramCommitteeMemberId = new Guid("9f5618e2-2a9b-45bb-9655-8a6b635e477b"),
			NominationId = new Guid("c99e4ec7-4545-4262-89e2-d83eb570509d"),
		},

		new Grade
		{
			Id = new Guid("8f4967fa-03bb-4c9f-819d-e7031f5bf176"),
			Text = "GradeText1_3_2",
			ReportGrade = 5,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			ProgramCommitteeMemberId = new Guid("54709833-c459-4dbf-b1c5-bbecd4cb8be0"),
			NominationId = new Guid("c99e4ec7-4545-4262-89e2-d83eb570509d"),
		},

		new Grade
		{
			Id = new Guid("49029fc1-5a21-4122-8ce6-4fa29f1c5f2f"),
			Text = "GradeText2_1_1",
			ReportGrade = 6,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			ProgramCommitteeMemberId = new Guid("9f5618e2-2a9b-45bb-9655-8a6b635e477b"),
			NominationId = new Guid("48cfadc1-877b-4df3-bd42-a13388bad389"),
		},

		new Grade
		{
			Id = new Guid("1cb42272-5059-4f2d-82b9-14c861cb09e2"),
			Text = "GradeText2_1_2",
			ReportGrade = 7,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			ProgramCommitteeMemberId = new Guid("54709833-c459-4dbf-b1c5-bbecd4cb8be0"),
			NominationId = new Guid("48cfadc1-877b-4df3-bd42-a13388bad389"),
		},

		new Grade
		{
			Id = new Guid("b3f4831c-080a-431a-b605-bf53ddcb56f0"),
			Text = "GradeText2_2_1",
			ReportGrade = 8,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			ProgramCommitteeMemberId = new Guid("9f5618e2-2a9b-45bb-9655-8a6b635e477b"),
			NominationId = new Guid("d74e442a-de93-4c28-bb51-c47335c48c7b"),
		},

		new Grade
		{
			Id = new Guid("8b804723-1b51-49c8-8cdf-fe0489cff74b"),
			Text = "GradeText2_2_2",
			ReportGrade = 9,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			ProgramCommitteeMemberId = new Guid("54709833-c459-4dbf-b1c5-bbecd4cb8be0"),
			NominationId = new Guid("d74e442a-de93-4c28-bb51-c47335c48c7b"),
		},

		new Grade
		{
			Id = new Guid("64562d5d-7e89-4d11-b984-53d9d594d41a"),
			Text = "GradeText2_3_1",
			ReportGrade = 10,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			ProgramCommitteeMemberId = new Guid("9f5618e2-2a9b-45bb-9655-8a6b635e477b"),
			NominationId = new Guid("c99e4ec7-4545-4262-89e2-d83eb570509d"),
		},

		new Grade
		{
			Id = new Guid("5e94fb9b-d4b9-4f95-8156-f9335b8522f9"),
			Text = "GradeText2_3_2",
			ReportGrade = 6,
			Date = new DateTime(2023, 2, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			ProgramCommitteeMemberId = new Guid("54709833-c459-4dbf-b1c5-bbecd4cb8be0"),
			NominationId = new Guid("c99e4ec7-4545-4262-89e2-d83eb570509d"),
		},
	];
}
