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
			StudentId = new Guid("1748e436-514b-4acc-b7f0-a646dd9fdec3")
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
			StudentId = new Guid("3cd57f1f-aaff-4252-b632-896ab67713b8")
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
		},

		new User
		{
			Id = new Guid("c2f8f85c-3f1b-4637-a401-3913157d9a22"),
			Login = "teacher3",
			Password = "teacher3",
			Name = "TeacherName3",
			IsStudent = false,
			UniversityId = new Guid("b6310a8f-ad4e-4faf-981c-e852d856081b"),
			TeacherId = new Guid("93f21d3b-f696-4663-919e-c7aa20b85e7d"),
			StudentId = null
		},

		new User
		{
			Id = new Guid("57697956-c792-4931-aac0-81cc4e12e65c"),
			Login = "teacher4",
			Password = "teacher4",
			Name = "TeacherName4",
			IsStudent = false,
			UniversityId = new Guid("b6310a8f-ad4e-4faf-981c-e852d856081b"),
			TeacherId = new Guid("35224b73-1d2e-4065-a529-f1ccb1673427"),
			StudentId = null
		},

		new User
		{
			Id = new Guid("f69fa14d-5440-47a3-a99a-2961910f2936"),
			Login = "teacher5",
			Password = "teacher5",
			Name = "TeacherName5",
			IsStudent = false,
			UniversityId = new Guid("b6310a8f-ad4e-4faf-981c-e852d856081b"),
			TeacherId = new Guid("1aa8aa0e-1222-405c-8b6d-52af5e293d78"),
			StudentId = null
		},

		new User
		{
			Id = new Guid("f22fd497-39b8-4b93-9b19-3cf4a084bc07"),
			Login = "teacher6",
			Password = "teacher6",
			Name = "TeacherName6",
			IsStudent = false,
			UniversityId = new Guid("ac26aeae-22f8-4318-8b1f-e03f35eab0a7"),
			TeacherId = new Guid("ed6d0164-3a15-43fe-a4e7-71f81e184047"),
			StudentId = null
		},

		new User
		{
			Id = new Guid("2ffea570-b26a-43a6-bb24-a13d004290a0"),
			Login = "teacher7",
			Password = "teacher7",
			Name = "TeacherName7",
			IsStudent = false,
			UniversityId = new Guid("ac26aeae-22f8-4318-8b1f-e03f35eab0a7"),
			TeacherId = new Guid("cc64136a-4bc3-46e5-a194-23968924746b"),
			StudentId = null
		},

		new User
		{
			Id = new Guid("63f9aa33-1ebb-4cd1-854b-f9e230dcca1b"),
			Login = "teacher8",
			Password = "teacher8",
			Name = "TeacherName8",
			IsStudent = false,
			UniversityId = new Guid("ac26aeae-22f8-4318-8b1f-e03f35eab0a7"),
			TeacherId = new Guid("7f1a3891-18c9-4cbb-9790-608ebe7acf29"),
			StudentId = null
		}

	];
}
