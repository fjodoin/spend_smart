using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace SpendApi.Models
{
    public class Income
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(140)]
        public string Company { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime DateIncome { get; set; }

        [Required]
        public string Type { get; set; }
    }
}