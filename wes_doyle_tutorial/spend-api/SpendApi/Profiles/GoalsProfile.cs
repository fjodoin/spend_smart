using AutoMapper;
using SpendApi.Dtos;
using SpendApi.Models;

namespace SpendApi.Profiles
{
    public class GoalsProfile : Profile
    {
        public GoalsProfile()
        {
            //Source --> Destination
            CreateMap<Goal, GoalReadDto>();
            CreateMap<GoalCreateDto, Goal>();
            CreateMap<GoalUpdateDto, Goal>();
            CreateMap<Goal, GoalUpdateDto>();
        }
    }
}