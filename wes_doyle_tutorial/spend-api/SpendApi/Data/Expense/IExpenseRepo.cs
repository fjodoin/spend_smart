using System.Collections.Generic;
using System;
using SpendApi.Models;


namespace SpendApi.Data
{
    public interface IExpenseRepo
    {
        void CreateExpense(Expense exp);
        void UpdateExpense(Expense exp);
        void DeleteExpense(Expense exp);
        Expense GetExpenseById(int id);
        IEnumerable<Expense> GetAllExpenses();
        IEnumerable<Expense> GetExpensesByDates(DateTime date1, DateTime date2);
        IEnumerable<Expense> GetExpensesByMonth(DateTime year_month);
        bool SaveChanges();
    }
}