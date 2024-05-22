namespace SWS.DAL.InitialData;

public static class UserInitial
{
	public static readonly List<User> Users =
	[
		new User
		{
			Id = new Guid("5e4d84fa-2bd7-4c0a-b6fc-ea3d3148b14b"),
			Login = "student1",
			Password = "student1",
			Name = "StudentName1",
			IsStudent = true,
			UniversityId = new Guid("ac26aeae-22f8-4318-8b1f-e03f35eab0a7"),
			TeacherId = null,
			StudentId = null
		},

		new User
		{
			Id = new Guid("2d2d3627-b91c-4347-a49d-1ad87f07d50b"),
			Login = "student2",
			Password = "student2",
			Name = "StudentName2",
			IsStudent = true,
			UniversityId = new Guid("b6310a8f-ad4e-4faf-981c-e852d856081b"),
			TeacherId = null,
			StudentId = null
		},

		new User
		{
			Id = new Guid("ceef3329-fe7d-4b76-938f-1058f6aee7c2"),
			Login = "teacher1",
			Password = "teacher1",
			Name = "TeacherName1",
			IsStudent = false,
			UniversityId = new Guid("ac26aeae-22f8-4318-8b1f-e03f35eab0a7"),
			TeacherId = new Guid("e27773c6-d514-4d4d-9c62-268a288a2c50"),
			StudentId = null
		},

		new User
		{
			Id = new Guid("d68f5653-4fba-4943-b0ac-ca354280d60f"),
			Login = "teacher2",
			Password = "teacher2",
			Name = "TeacherName2",
			IsStudent = false,
			UniversityId = new Guid("b6310a8f-ad4e-4faf-981c-e852d856081b"),
			TeacherId = new Guid("f6d5847c-0901-4e84-86de-4fc20222e4be"),
			StudentId = null
		}

	];
}
