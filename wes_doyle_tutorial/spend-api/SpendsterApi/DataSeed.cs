using System.Linq;
using System.Collections.Generic;
using SpendsterApi.Models;
using SpendsterApi.Data;

namespace SpendsterApi
{
    public class DataSeed
    {
        private readonly ExpenseContext _ctx;

        public DataSeed(ExpenseContext ctx)
        {
            _ctx = ctx;
        }

        public void SeedData(int nExpenses)
        {
            if (!_ctx.Expenses.Any())
            {
                SeedExpenses(nExpenses);
            }
            
            _ctx.SaveChanges();
        }

        private void SeedExpenses(int n)
        {
            List<Expense> expenses = BuildExpenseList(n);

            foreach(var expense in expenses)
            {
                _ctx.Expenses.Add(expense);
            }
        }

        private List<Expense> BuildExpenseList(int nExpenses)
        {
            var expenses = new List<Expense>();
            var companies = new List<string>();

            for(var i = 1; i <= nExpenses; i++)
            {
                var company = Helpers.MakeExpenseCompany(companies);
                companies.Add(company);

                expenses.Add(new Expense{
                    Company = company,
                    Amount = Helpers.MakeExpenseAmount(),
                    Date = Helpers.MakeExpenseDate(),
                    Type = Helpers.MakeExpenseType()
                });
            }

            return expenses;
        }
    }
}