using System;
using System.Collections.Generic;
using System.Linq;
using SpendsterApi.Models;

namespace SpendsterApi.Data
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
            if(exp == null)
            {
                throw new ArgumentNullException(nameof(exp));
            }

            _context.Expenses.Add(exp);
        }

        public void UpdateExpense(Expense exp) { /** Covered by DBContext **/ }

        public void DeleteExpense(Expense exp)
        {
            if(exp == null)
            {
                throw new ArgumentNullException(nameof(exp));
            }

            _context.Expenses.Remove(exp);
        }

        public IEnumerable<Expense> GetAllExpenses()
        {
            return _context.Expenses.ToList();
        }

        public Expense GetExpenseById(int id)
        {
            return _context.Expenses.FirstOrDefault(p => p.Id == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}