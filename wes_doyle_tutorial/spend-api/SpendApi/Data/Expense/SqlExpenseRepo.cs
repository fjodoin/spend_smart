using System;
using System.Collections.Generic;
using System.Linq;
using SpendApi.Models;

namespace SpendApi.Data
{
    public class SqlExpenseRepo : IExpenseRepo
    {
        private readonly ExpenseContext _context;

        public SqlExpenseRepo(ExpenseContext context)
        {
            _context = context;
        }

        public void CreateExpense(Expense exp)
        {
            if (exp == null)
            {
                throw new ArgumentNullException(nameof(exp));
            }

            _context.Expenses.Add(exp);
        }

        public void UpdateExpense(Expense exp) { /** Covered by DBContext **/ }

        public void DeleteExpense(Expense exp)
        {
            if (exp == null)
            {
                throw new ArgumentNullException(nameof(exp));
            }

            _context.Expenses.Remove(exp);
        }

        public Expense GetExpenseById(int id)
        {
            return _context.Expenses.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Expense> GetAllExpenses()
        {
            return _context.Expenses.ToList();
        }

        public IEnumerable<Expense> GetExpensesByDates(DateTime date1, DateTime date2)
        {
            //Return Logic not implemented yet
            return _context.Expenses.Where(expDate => expDate.DateExpense >= date1 && expDate.DateExpense <= date2).ToList();
        }

        public IEnumerable<Expense> GetExpensesByMonth(DateTime year_month)
        {
            //Return Logic not implemented yet
            var firstDayOfMonth = new DateTime(year_month.Year, year_month.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            return _context.Expenses.Where(expDate => expDate.DateExpense >= firstDayOfMonth && expDate.DateExpense <= lastDayOfMonth).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}