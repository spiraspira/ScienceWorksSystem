#pragma warning disable S6562
namespace SWS.DAL.InitialData;

public static class ContestInitial
{
	public static readonly List<Contest> Contests =
	[
		new Contest
		{
			Id = new Guid("dc25d363-694a-4561-99a9-846948b3e2b5"),
			Name = "ContestFinished1",
			Description = "Description.",
			DateStart = new DateTime(2023, 01, 01),
			DateStartSecondTour = new DateTime(2023, 02, 01),
			DateEnd = new DateTime(2023, 03, 01),
			OrganizationCommitteeId = new Guid("5e7c8325-15c8-45f2-8393-f9b151d80a52"),
			ProgramCommitteeId = new Guid("c40408bb-7935-4b1f-9360-d03ffb6f1fa4"),
			InvitedTeacherId = new Guid("35224b73-1d2e-4065-a529-f1ccb1673427"),
		},

		new Contest
		{
			Id = new Guid("60c70265-335c-41c8-ae8e-f44f2ffd6253"),
			Name = "Contest1",
			Description = "Description.",
			DateStart = new DateTime(2024, 05, 01),
			DateStartSecondTour = new DateTime(2024, 06, 01),
			DateEnd = new DateTime(2024, 07, 01),
			OrganizationCommitteeId = new Guid("6c234451-67d1-4f9d-9c4c-fd23a2ba86e3"),
			ProgramCommitteeId = new Guid("cf4d6160-bdf1-4f09-a0c0-dcaa25942395"),
			InvitedTeacherId = new Guid("93f21d3b-f696-4663-919e-c7aa20b85e7d"),
		},

		new Contest
		{
			Id = new Guid("b80017bb-3492-437e-a85f-473715b96ed5"),
			Name = "Contest1",
			Description = "Description.",
			DateStart = new DateTime(2024, 03, 01),
			DateStartSecondTour = new DateTime(2024, 04, 01),
			DateEnd = new DateTime(2024, 05, 31),
			OrganizationCommitteeId = new Guid("5840c4b2-bc1e-438f-975f-2efc63445a89"),
			ProgramCommitteeId = new Guid("8406469e-2c6a-44fa-8a81-1ab44c34d691"),
			InvitedTeacherId = new Guid("f6d5847c-0901-4e84-86de-4fc20222e4be"),
		},

		new Contest
		{
			Id = new Guid("37b2caa0-7b89-4b8c-a61b-ad612a9814d8"),
			Name = "Contest1",
			Description = "Description.",
			DateStart = new DateTime(2024, 08, 01),
			DateStartSecondTour = new DateTime(2024, 09, 01),
			DateEnd = new DateTime(2024, 10, 01),
			OrganizationCommitteeId = new Guid("3226a5eb-b8f9-4c45-b174-808ab13db2de"),
			ProgramCommitteeId = new Guid("51a03ec0-808a-409d-a40a-8a7c20869451"),
			InvitedTeacherId = new Guid("e27773c6-d514-4d4d-9c62-268a288a2c50"),
		},
	];
}
