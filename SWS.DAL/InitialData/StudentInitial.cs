namespace SWS.DAL.InitialData;

public static class StudentInitial
{
	public static readonly List<Student> Students =
	[
		new Student
		{
			Id = new Guid("1748e436-514b-4acc-b7f0-a646dd9fdec3"),
			UserId = new Guid("5e4d84fa-2bd7-4c0a-b6fc-ea3d3148b14b"),
		},

		new Student
		{
			Id = new Guid("3cd57f1f-aaff-4252-b632-896ab67713b8"),
			UserId = new Guid("2d2d3627-b91c-4347-a49d-1ad87f07d50b"),
		},
	];
}
