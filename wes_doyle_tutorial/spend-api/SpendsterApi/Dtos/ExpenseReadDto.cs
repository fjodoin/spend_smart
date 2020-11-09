namespace SpendsterApi.Dtos
{
    public class ExpenseReadDto
    {
        public int Id { get; set; }

        public string Company { get; set; }

        public decimal Amount { get; set; }

        public string Date { get; set; }

        public string Type { get; set; }
    }
}