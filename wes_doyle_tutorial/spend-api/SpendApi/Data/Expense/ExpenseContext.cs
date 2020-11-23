using SpendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SpendApi.Data
{
    public class ExpenseContext : DbContext
    {
        public ExpenseContext(DbContextOptions<ExpenseContext> opt) : base(opt) { }

        public DbSet<Expense> Expenses { get; set; }
    }
}