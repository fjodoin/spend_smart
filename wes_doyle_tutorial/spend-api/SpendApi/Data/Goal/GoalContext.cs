using SpendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SpendApi.Data
{
    public class GoalContext : DbContext
    {
        public GoalContext(DbContextOptions<GoalContext> opt) : base(opt) { }

        public DbSet<Goal> Goals { get; set; }
    }
}