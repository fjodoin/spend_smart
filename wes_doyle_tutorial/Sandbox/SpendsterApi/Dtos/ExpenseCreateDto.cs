using System.ComponentModel.DataAnnotations;
using System;

namespace SpendsterApi.Dtos
{
    public class ExpenseCreateDto
    {
        [Required]
        [MaxLength(140)]
        public string Company { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Type { get; set; }
    }
}