using AutoMapper;
using SpendsterApi.Dtos;
using SpendsterApi.Models;

namespace SpendsterApi.Profiles
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