#pragma warning disable S6562
namespace SWS.DAL.InitialData;

public static class ReviewInitial
{
	public static readonly List<Review> Reviews =
	[
		new Review
		{
			Id = new Guid("7bd54698-5959-46b3-a993-660c53066f9f"),
			Text = "ReviewText1_1",
			Date = new DateTime(2023, 1, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			OrganizationCommitteeMemberId = new Guid("0de6be90-be65-42da-af3f-26f627f53704"),
		},

		new Review
		{
			Id = new Guid("3f5211b4-9dc7-406b-a69a-c63fe713aea5"),
			Text = "ReviewText1_2",
			Date = new DateTime(2023, 1, 10),
			ReportId = new Guid("734b6c9b-19e9-483d-a540-a6025c8fc1ba"),
			OrganizationCommitteeMemberId = new Guid("fff74dfa-0071-46f8-8c15-3fa2613c5ddf"),
		},

		new Review
		{
			Id = new Guid("34970c0d-bba5-430f-954a-48afd3245a1f"),
			Text = "ReviewText2_1",
			Date = new DateTime(2023, 1, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			OrganizationCommitteeMemberId = new Guid("0de6be90-be65-42da-af3f-26f627f53704"),
		},

		new Review
		{
			Id = new Guid("5a7a4b66-43f5-4995-aad4-15c1de3c090c"),
			Text = "ReviewText2_2",
			Date = new DateTime(2023, 1, 10),
			ReportId = new Guid("aab2f9fa-cffa-4e34-9039-b4b87911f6dd"),
			OrganizationCommitteeMemberId = new Guid("fff74dfa-0071-46f8-8c15-3fa2613c5ddf"),
		},

		new Review
		{
			Id = new Guid("f14b889e-cf5e-486e-9196-c2822d10363d"),
			Text = "ReviewText3_1",
			Date = new DateTime(2024, 3, 10),
			ReportId = new Guid("37880e30-a39e-4864-87bf-79de70dbc998"),
			OrganizationCommitteeMemberId = new Guid("f95d3321-ec0d-4652-9d7d-7d975ce21114"),
		},

		new Review
		{
			Id = new Guid("37235f84-ea6d-4425-b223-53e27a9ad349"),
			Text = "ReviewText3_2",
			Date = new DateTime(2024, 3, 10),
			ReportId = new Guid("37880e30-a39e-4864-87bf-79de70dbc998"),
			OrganizationCommitteeMemberId = new Guid("11f0940f-cf10-4fdf-bc75-9bdc5ef6e871"),
		},
	];
}
