using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace SpendApi.Dtos
{
    public class ExpenseUpdateDto
    {
        [Required]
        [MaxLength(140)]
        public string Company { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Type { get; set; }
    }
}