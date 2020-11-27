using System.Collections.Generic;
using System;
using SpendApi.Models;


namespace SpendApi.Data
{
    public interface IBillRepo
    {
        void CreateBill(Bill bill);
        void UpdateBill(Bill bill);
        void DeleteBill(Bill bill);
        Bill GetBillById(int id);
        IEnumerable<Bill> GetAllBills();
        IEnumerable<Bill> GetBillsByDates(DateTime date1, DateTime date2);
        IEnumerable<Bill> GetBillsByMonth(DateTime year_month);
        bool SaveChanges();
    }
}