using System;
using System.Collections.Generic;
using System.Linq;
using SpendApi.Models;

namespace SpendApi.Data
{
    public class SqlGoalRepo : IGoalRepo
    {
        private readonly GoalContext _context;

        public SqlGoalRepo(GoalContext context)
        {
            _context = context;
        }

        public void CreateGoal(Goal goal)
        {
            if (goal == null)
            {
                throw new ArgumentNullException(nameof(goal));
            }

            _context.Goals.Add(goal);
        }

        public void UpdateGoal(Goal goal) { /** Covered by DBContext **/ }

        public void DeleteGoal(Goal goal)
        {
            if (goal == null)
            {
                throw new ArgumentNullException(nameof(goal));
            }

            _context.Goals.Remove(goal);
        }

        public Goal GetGoalById(int id)
        {
            return _context.Goals.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Goal> GetAllGoals()
        {
            return _context.Goals.ToList();
        }

        public IEnumerable<Goal> GetGoalsByDates(DateTime date1, DateTime date2)
        {
            //Return Logic not implemented yet
            return _context.Goals.Where(goalDate => goalDate.DateGoal >= date1 && goalDate.DateGoal <= date2).ToList();
        }

        public IEnumerable<Goal> GetGoalsByMonth(DateTime year_month)
        {
            //Return Logic not implemented yet
            var firstDayOfMonth = new DateTime(year_month.Year, year_month.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            return _context.Goals.Where(goalDate => goalDate.DateGoal >= firstDayOfMonth && goalDate.DateGoal <= lastDayOfMonth).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}