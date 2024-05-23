#pragma warning disable S6562
namespace SWS.DAL.InitialData;

public static class ReportInitial
{
	public static readonly List<Report> Reports =
	[
		new Report
		{
			Id = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			Name = "Report1",
			File = File.ReadAllBytes("InitialData/ReportFiles/Report1.docx"),
			DateUploaded = new DateTime(2023, 1, 2),
			DateUpdated = new DateTime(2023, 1, 2),
			IsAccepted = true,
			Grade = 7,
			InvitedTeacherReview = "Good.",
			InvitedTeacherGrade = 8,
			TeamId = new Guid("da5e79e0-c803-4f40-8761-22e43ef9e5dd"),
			ContestId = new Guid("dc25d363-694a-4561-99a9-846948b3e2b5"),
		},

		new Report
		{
			Id = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			Name = "Report2",
			File = File.ReadAllBytes("InitialData/ReportFiles/Report2.docx"),
			DateUploaded = new DateTime(2023, 1, 2),
			DateUpdated = new DateTime(2023, 1, 2),
			IsAccepted = true,
			Grade = 9,
			InvitedTeacherReview = "Excellent.",
			InvitedTeacherGrade =10,
			TeamId = new Guid("9a6a5b35-3cb7-42cc-979b-bf2c4b1d86a6"),
			ContestId = new Guid("dc25d363-694a-4561-99a9-846948b3e2b5"),
		},

		new Report
		{
			Id = new Guid("50680bf2-3528-467f-ae86-c4e264890e06"),
			Name = "Report3",
			File = File.ReadAllBytes("InitialData/ReportFiles/Report3.docx"),
			DateUploaded = new DateTime(2024, 5, 2),
			DateUpdated = new DateTime(2024, 5, 2),
			IsAccepted = false,
			Grade = null,
			InvitedTeacherReview = null,
			InvitedTeacherGrade = null,
			TeamId = new Guid("da5e79e0-c803-4f40-8761-22e43ef9e5dd"),
			ContestId = new Guid("60c70265-335c-41c8-ae8e-f44f2ffd6253"),
		},

		new Report
		{
			Id = new Guid("37880e30-a39e-4864-87bf-79de70dbc998"),
			Name = "Report4",
			File = File.ReadAllBytes("InitialData/ReportFiles/Report4.docx"),
			DateUploaded = new DateTime(2024, 3, 2),
			DateUpdated = new DateTime(2023, 3, 2),
			IsAccepted = true,
			Grade = null,
			InvitedTeacherReview = "Ok.",
			InvitedTeacherGrade = null,
			TeamId = new Guid("9a6a5b35-3cb7-42cc-979b-bf2c4b1d86a6"),
			ContestId = new Guid("b80017bb-3492-437e-a85f-473715b96ed5"),
		},
	];
}
