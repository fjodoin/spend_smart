using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace SpendApi.Dtos
{
    public class GoalReadDto
    {

        public int Id { get; set; }

        public string Company { get; set; }

        public decimal AmountSaved { get; set; }

        public decimal AmountGoal { get; set; }

        public DateTime DateGoal { get; set; }

        public string Type { get; set; }
    }
}