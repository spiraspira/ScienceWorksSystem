﻿namespace SWS.DAL.Entities;

public class University : Entity
{
	public string? Name { get; set; }

	public string? Location { get; set; }

	public List<User> Users { get; set; } = [];
}
