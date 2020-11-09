using System.Collections.Generic;
using SpendsterApi.Models;

namespace SpendsterApi.Data
{
    public interface IExpenseRepo
    {
        void CreateExpense(Expense exp);
        void UpdateExpense(Expense exp);
        void DeleteExpense(Expense exp);
        IEnumerable<Expense> GetAllExpenses();
        Expense GetExpenseById(int id);
        bool SaveChanges();
    }
}