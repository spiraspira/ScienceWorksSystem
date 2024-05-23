namespace SWS.DAL.InitialData;

public static class TeamInitial
{
	public static readonly List<Team> Teams =
	[
		new Team
		{
			Id = new Guid("da5e79e0-c803-4f40-8761-22e43ef9e5dd"),
			StudentId = new Guid("1748e436-514b-4acc-b7f0-a646dd9fdec3"),
			TeacherId = new Guid("e27773c6-d514-4d4d-9c62-268a288a2c50")
		},

		new Team
		{
			Id = new Guid("9a6a5b35-3cb7-42cc-979b-bf2c4b1d86a6"),
			StudentId = new Guid("3cd57f1f-aaff-4252-b632-896ab67713b8"),
			TeacherId = new Guid("f6d5847c-0901-4e84-86de-4fc20222e4be")
		},
	];
}
