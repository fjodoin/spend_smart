using SpendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SpendApi.Data
{
    public class BillContext : DbContext
    {
        public BillContext(DbContextOptions<BillContext> opt) : base(opt) { }

        public DbSet<Bill> Bills { get; set; }
    }
}