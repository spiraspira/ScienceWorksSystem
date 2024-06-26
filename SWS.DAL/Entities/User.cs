﻿namespace SWS.DAL.Entities;

public class User : Entity
{
	public string? Login { get; set; }

	public string? Password { get; set; }

	public string? Name { get; set; }

	public bool? IsStudent { get; set; }

	public Guid? UniversityId { get; set; }

	public Guid? TeacherId { get; set; }

	public Guid? StudentId { get; set; }

	public University? University { get; set; }

	public Teacher? Teacher { get; set; }

	public Student? Student { get; set; }
}
