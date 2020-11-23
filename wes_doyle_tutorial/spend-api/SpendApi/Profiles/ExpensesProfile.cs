using AutoMapper;
using SpendApi.Dtos;
using SpendApi.Models;

namespace SpendApi.Profiles
{
    public class ExpensesProfile : Profile
    {
        public ExpensesProfile()
        {
            //Source --> Destination
            CreateMap<Expense, ExpenseReadDto>();
            CreateMap<ExpenseCreateDto, Expense>();
            CreateMap<ExpenseUpdateDto, Expense>();
            CreateMap<Expense, ExpenseUpdateDto>();
        }
    }
}