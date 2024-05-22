namespace SWS.DAL.InitialData;

public static class TeacherInitial
{
	public static readonly List<Teacher> Teachers =
	[
		new Teacher
		{
			Id = new Guid("e27773c6-d514-4d4d-9c62-268a288a2c50"),
			UserId = new Guid("ceef3329-fe7d-4b76-938f-1058f6aee7c2"),
		},

		new Teacher
		{
			Id = new Guid("f6d5847c-0901-4e84-86de-4fc20222e4be"),
			UserId = new Guid("d68f5653-4fba-4943-b0ac-ca354280d60f"),
		},
	];
}
