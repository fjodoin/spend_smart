using AutoMapper;
using SpendApi.Dtos;
using SpendApi.Models;

namespace SpendApi.Profiles
{
    public class BillsProfile : Profile
    {
        public BillsProfile()
        {
            //Source --> Destination
            CreateMap<Bill, BillReadDto>();
            CreateMap<BillCreateDto, Bill>();
            CreateMap<BillUpdateDto, Bill>();
            CreateMap<Bill, BillUpdateDto>();
        }
    }
}