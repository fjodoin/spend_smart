using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace SpendApi.Dtos
{
    public class BillReadDto
    {

        public int Id { get; set; }

        public string Company { get; set; }

        public decimal AmountSaved { get; set; }

        public decimal AmountDue { get; set; }

        public DateTime DateDue { get; set; }

        public string Type { get; set; }
    }
}