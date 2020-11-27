using AutoMapper;
using SpendApi.Dtos;
using SpendApi.Models;

namespace SpendApi.Profiles
{
    public class IncomesProfile : Profile
    {
        public IncomesProfile()
        {
            //Source --> Destination
            CreateMap<Income, IncomeReadDto>();
            CreateMap<IncomeCreateDto, Income>();
            CreateMap<IncomeUpdateDto, Income>();
            CreateMap<Income, IncomeUpdateDto>();
        }
    }
}