using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace SpendApi.Dtos
{
    public class GoalCreateDto
    {
        [Required]
        [MaxLength(140)]
        public string Company { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal AmountSaved { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal AmountGoal { get; set; }

        [Required]
        public DateTime DateGoal { get; set; }

        [Required]
        public string Type { get; set; }
    }
}