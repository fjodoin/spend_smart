using System;

namespace SpendApi.Dtos
{
    public class IncomeReadDto
    {
        public int Id { get; set; }

        public string Company { get; set; }

        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        public string Type { get; set; }
    }
}