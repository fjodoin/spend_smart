using System;
using System.Collections.Generic;
using System.Linq;
using SpendApi.Models;

namespace SpendApi.Data
{
    public class SqlIncomeRepo : IIncomeRepo
    {
        private readonly IncomeContext _context;

        public SqlIncomeRepo(IncomeContext context)
        {
            _context = context;
        }

        public void CreateIncome(Income inc)
        {
            if (inc == null)
            {
                throw new ArgumentNullException(nameof(inc));
            }

            _context.Incomes.Add(inc);
        }

        public void UpdateIncome(Income inc) { /** Covered by DBContext **/ }

        public void DeleteIncome(Income inc)
        {
            if (inc == null)
            {
                throw new ArgumentNullException(nameof(inc));
            }

            _context.Incomes.Remove(inc);
        }

        public Income GetIncomeById(int id)
        {
            return _context.Incomes.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Income> GetAllIncomes()
        {
            return _context.Incomes.ToList();
        }

        public IEnumerable<Income> GetIncomesByDates(DateTime date1, DateTime date2)
        {
            //Return Logic not implemented yet
            return _context.Incomes.Where(incDate => incDate.DateIncome >= date1 && incDate.DateIncome <= date2).ToList();
        }

        public IEnumerable<Income> GetIncomesByMonth(DateTime year_month)
        {
            //Return Logic not implemented yet
            var firstDayOfMonth = new DateTime(year_month.Year, year_month.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            return _context.Incomes.Where(incDate => incDate.DateIncome >= firstDayOfMonth && incDate.DateIncome <= lastDayOfMonth).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}