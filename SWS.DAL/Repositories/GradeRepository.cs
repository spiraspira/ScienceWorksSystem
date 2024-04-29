﻿namespace SWS.DAL.Repositories;

public class GradeRepository(ApplicationDbContext context) : GenericRepository<Grade>(context), IGradeRepository
{
	public async Task<IEnumerable<Grade>> GetGradesOfReport(Guid reportId)
	{
		return await Set
			.Include(grade => grade.ProgramCommitteeMember)
			.Where(grade => grade.ReportId == reportId)
			.ToListAsync();
	}

	public async Task<IEnumerable<Grade>> GetGradesOfNomination(Guid nominationId)
	{
		return await Set
			.Include(grade => grade.ProgramCommitteeMember)
			.Where(grade => grade.NominationId == nominationId)
			.ToListAsync();
	}
}
