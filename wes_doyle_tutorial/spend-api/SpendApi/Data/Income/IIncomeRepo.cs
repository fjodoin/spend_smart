using System.Collections.Generic;
using System;
using SpendApi.Models;


namespace SpendApi.Data
{
    public interface IIncomeRepo
    {
        void CreateIncome(Income inc);
        void UpdateIncome(Income inc);
        void DeleteIncome(Income inc);
        Income GetIncomeById(int id);
        IEnumerable<Income> GetAllIncomes();
        IEnumerable<Income> GetIncomesByDates(DateTime date1, DateTime date2);
        IEnumerable<Income> GetIncomesByMonth(DateTime year_month);
        bool SaveChanges();
    }
}