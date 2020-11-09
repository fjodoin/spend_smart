using SpendsterApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SpendsterApi.Data
{
	public class ExpenseContext : DbContext
    {
        public ExpenseContext(DbContextOptions<ExpenseContext> opt) : base(opt) { }

        public DbSet<Expense> Expenses { get; set; }
    }
}