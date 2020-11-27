using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace SpendApi.Models
{
    public class Bill
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(140)]
        public string Company { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal AmountSaved { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal AmountDue { get; set; }

        [Required]
        public DateTime DateBill { get; set; }

        [Required]
        public string Type { get; set; }
    }
}