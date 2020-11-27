using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using SpendApi.Models;
using SpendApi.Data;
using SpendApi.Dtos;
using System.Windows.Input;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using System.Linq;
using System;

namespace SpendApi.Controllers
{
    [Route("api/spendster/goals")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly IGoalRepo _repository;
        private readonly IMapper _mapper;

        public GoalsController(IGoalRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET api/spendster/goals/
        [HttpGet]
        public ActionResult<IEnumerable<GoalReadDto>> GetAllGoals()
        {
            var goalItems = _repository.GetAllGoals();
            var mappedGoalItems = _mapper.Map<IEnumerable<GoalReadDto>>(goalItems);

            return Ok(mappedGoalItems);
        }

        //GET api/spendster/goals/{id}
        [HttpGet("{id}", Name = "GetGoalById")]
        public ActionResult<GoalReadDto> GetGoalById(int id)
        {
            var goalItem = _repository.GetGoalById(id);
            if (goalItem != null)
            {
                return Ok(_mapper.Map<GoalReadDto>(goalItem));
            }
            return NotFound();
        }

        //GET api/spendster/goals/{year_month}
        [HttpGet("year_month={year_month}", Name = "GetGoalsByMonth")]
        public ActionResult<GoalReadDto> GetGoalsByMonth(DateTime year_month)
        {
            var goalItems = _repository.GetGoalsByMonth(year_month);
            if (goalItems != null)
            {
                return Ok(goalItems);
            }
            return NotFound();
        }

        //GET api/spendster/goals/{date1}&{date2}
        [HttpGet("date1={date1}&date2={date2}", Name = "GetGoalsByDates")]
        public ActionResult<GoalReadDto> GetGoalsByDates(DateTime date1, DateTime date2)
        {
            var goalItems = _repository.GetGoalsByDates(date1, date2);
            if (goalItems != null)
            {
                return Ok(goalItems);
            }
            return NotFound();
        }

        //POST api/spendster/goals/
        [HttpPost]
        public ActionResult<GoalReadDto> CreateGoal(GoalCreateDto goalCreateDto)
        {
            var goalModel = _mapper.Map<Goal>(goalCreateDto);
            _repository.CreateGoal(goalModel);
            _repository.SaveChanges();

            var goalReadDto = _mapper.Map<GoalReadDto>(goalModel);

            return CreatedAtRoute(nameof(GetGoalById), new { Id = goalReadDto.Id }, goalReadDto);
        }

        //PUT api/spendster/goals/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateGoal(int id, GoalUpdateDto goalUpdateDto)
        {
            var goalModelFromRepo = _repository.GetGoalById(id);
            if (goalModelFromRepo == null)
            {
                return NotFound();
            }

            //Update Data
            _mapper.Map(goalUpdateDto, goalModelFromRepo);

            //Updater
            _repository.UpdateGoal(goalModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //PATCH api/spendster/goals/{id}
        [HttpPatch("{id}")]
        public ActionResult PartialGoalUpdate(int id, JsonPatchDocument<GoalUpdateDto> patchDoc)
        {
            var goalModelFromRepo = _repository.GetGoalById(id);
            if (goalModelFromRepo == null)
            {
                return NotFound();
            }

            var goalToPatch = _mapper.Map<GoalUpdateDto>(goalModelFromRepo);
            patchDoc.ApplyTo(goalToPatch, ModelState);
            if (!TryValidateModel(goalToPatch))
            {
                return ValidationProblem(ModelState);
            }

            //Update Data
            _mapper.Map(goalToPatch, goalModelFromRepo);

            //Updater
            _repository.UpdateGoal(goalModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //DELETE api/spendster/goals/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteGoal(int id)
        {
            var goalModelFromRepo = _repository.GetGoalById(id);
            if (goalModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteGoal(goalModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }
    }
}