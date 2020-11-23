using System;
using System.Collections.Generic;
using System.IO;

namespace SpendsterApi
{
    public class Helpers
    {
        private static readonly List<string> companyPrefix = new List<string>()
        {
            "Mega ",
            "Truffle ",
            "Kernel ",
            "Ripper ",
            "Fish ",
            "i",
            "Novi",
            "Smart",
            "Mart "
        };

        private static readonly List<string> companySuffix = new List<string>()
        {
            "Inc.",
            "& Sons.",
            "TM",
            "Electrik",
            "Byte",
            "Food",
            "Natura",
            "Frost",
            "Enterprise"
        };

        private static readonly List<string> expenseTypes = new List<string>()
        {
            "Restaurant",
            "Electronics",
            "Clothes",
            "House Appliances",
            "Other",
            "Credit Card",
            "Car Stuff",
            "Internet"
        };

        private static Random _rand = new Random();

        private static string GetRandom(IList<string> items)
        {
            return items[_rand.Next(items.Count)];
        }

        internal static string MakeExpenseCompany(List<string> companies)
        {
            var maxCompanies = companyPrefix.Count * companySuffix.Count;
            var prefix = GetRandom(companyPrefix);
            var suffix = GetRandom(companySuffix);
            var fullName = prefix + suffix;

            return fullName;
        }

        internal static decimal MakeExpenseAmount()
        {
            return _rand.Next(10, 500);
        }

        internal static string MakeExpenseDate()
        {
            var latest = DateTime.Now;
            var earliest = latest.AddDays(-30);

            TimeSpan possibleSpan = latest - earliest;
            TimeSpan newSpan = new TimeSpan(0, _rand.Next(0, (int)possibleSpan.TotalMinutes), 0);
            var newDate = earliest + newSpan;
            
            return newDate.ToString("yyyy/MM/dd");
        }

        internal static string MakeExpenseType()
        {
            return GetRandom(expenseTypes);
        }

    }
}