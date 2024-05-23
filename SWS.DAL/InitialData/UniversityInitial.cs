namespace SWS.DAL.InitialData;

public static class UniversityInitial
{
	public static readonly List<University> Universities =
	[
		new University
		{
			Id = new Guid("b6310a8f-ad4e-4faf-981c-e852d856081b"),
			Name = "Белорусско-Российский Университет",
			Location = "Могилев"
		},

		new University
		{
			Id = new Guid("ac26aeae-22f8-4318-8b1f-e03f35eab0a7"),
			Name = "Университет имени А.А.Кулешова",
			Location = "Могилев"
		},
	];
}
