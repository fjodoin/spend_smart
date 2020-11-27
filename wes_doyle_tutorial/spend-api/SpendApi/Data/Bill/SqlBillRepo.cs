using System;
using System.Collections.Generic;
using System.Linq;
using SpendApi.Models;

namespace SpendApi.Data
{
    public class SqlBillRepo : IBillRepo
    {
        private readonly BillContext _context;

        public SqlBillRepo(BillContext context)
        {
            _context = context;
        }

        public void CreateBill(Bill bill)
        {
            if (bill == null)
            {
                throw new ArgumentNullException(nameof(bill));
            }

            _context.Bills.Add(bill);
        }

        public void UpdateBill(Bill bill) { /** Covered by DBContext **/ }

        public void DeleteBill(Bill bill)
        {
            if (bill == null)
            {
                throw new ArgumentNullException(nameof(bill));
            }

            _context.Bills.Remove(bill);
        }

        public Bill GetBillById(int id)
        {
            return _context.Bills.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Bill> GetAllBills()
        {
            return _context.Bills.ToList();
        }

        public IEnumerable<Bill> GetBillsByDates(DateTime date1, DateTime date2)
        {
            //Return Logic not implemented yet
            return _context.Bills.Where(billDate => billDate.DateBill >= date1 && billDate.DateBill <= date2).ToList();
        }

        public IEnumerable<Bill> GetBillsByMonth(DateTime year_month)
        {
            //Return Logic not implemented yet
            var firstDayOfMonth = new DateTime(year_month.Year, year_month.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            return _context.Bills.Where(billDate => billDate.DateBill >= firstDayOfMonth && billDate.DateBill <= lastDayOfMonth).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}