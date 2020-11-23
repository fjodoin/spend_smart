using System.ComponentModel.DataAnnotations;

namespace SpendsterApi.Dtos
{
    public class ExpenseUpdateDto
    {
        [Required]
        [MaxLength(140)]
        public string Company { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Type { get; set; }
    }
}