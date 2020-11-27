using System.Collections.Generic;
using System;
using SpendApi.Models;


namespace SpendApi.Data
{
    public interface IGoalRepo
    {
        void CreateGoal(Goal goal);
        void UpdateGoal(Goal goal);
        void DeleteGoal(Goal goal);
        Goal GetGoalById(int id);
        IEnumerable<Goal> GetAllGoals();
        IEnumerable<Goal> GetGoalsByDates(DateTime date1, DateTime date2);
        IEnumerable<Goal> GetGoalsByMonth(DateTime year_month);
        bool SaveChanges();
    }
}