using SpendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SpendApi.Data
{
    public class IncomeContext : DbContext
    {
        public IncomeContext(DbContextOptions<IncomeContext> opt) : base(opt) { }

        public DbSet<Income> Incomes { get; set; }
    }
}