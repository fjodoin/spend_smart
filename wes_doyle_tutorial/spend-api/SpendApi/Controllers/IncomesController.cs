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
    [Route("api/spendster/incomes")]
    [ApiController]
    public class IncomesController : ControllerBase
    {
        private readonly IIncomeRepo _repository;
        private readonly IMapper _mapper;

        public IncomesController(IIncomeRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET api/spendster/incomes/
        [HttpGet]
        public ActionResult<IEnumerable<IncomeReadDto>> GetAllIncomes()
        {
            var incomeItems = _repository.GetAllIncomes();
            var mappedIncomeItems = _mapper.Map<IEnumerable<IncomeReadDto>>(incomeItems);

            return Ok(mappedIncomeItems);
        }

        //GET api/spendster/incomes/{id}
        [HttpGet("{id}", Name = "GetIncomeById")]
        public ActionResult<IncomeReadDto> GetIncomeById(int id)
        {
            var incomeItem = _repository.GetIncomeById(id);
            if (incomeItem != null)
            {
                return Ok(_mapper.Map<IncomeReadDto>(incomeItem));
            }
            return NotFound();
        }

        //GET api/spendster/incomes/{year_month}
        [HttpGet("year_month={year_month}", Name = "GetIncomesByMonth")]
        public ActionResult<IncomeReadDto> GetIncomesByMonth(DateTime year_month)
        {
            var incomeItems = _repository.GetIncomesByMonth(year_month);
            if (incomeItems != null)
            {
                return Ok(incomeItems);
            }
            return NotFound();
        }

        //GET api/spendster/incomes/{date1}&{date2}
        [HttpGet("date1={date1}&date2={date2}", Name = "GetIncomesByDates")]
        public ActionResult<IncomeReadDto> GetIncomesByDates(DateTime date1, DateTime date2)
        {
            var incomeItems = _repository.GetIncomesByDates(date1, date2);
            if (incomeItems != null)
            {
                return Ok(incomeItems);
            }
            return NotFound();
        }

        //POST api/spendster/incomes/
        [HttpPost]
        public ActionResult<IncomeReadDto> CreateIncome(IncomeCreateDto incomeCreateDto)
        {
            var incomeModel = _mapper.Map<Income>(incomeCreateDto);
            _repository.CreateIncome(incomeModel);
            _repository.SaveChanges();

            var incomeReadDto = _mapper.Map<IncomeReadDto>(incomeModel);

            return CreatedAtRoute(nameof(GetIncomeById), new { Id = incomeReadDto.Id }, incomeReadDto);
        }

        //PUT api/spendster/incomes/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateIncome(int id, IncomeUpdateDto incomeUpdateDto)
        {
            var incomeModelFromRepo = _repository.GetIncomeById(id);
            if (incomeModelFromRepo == null)
            {
                return NotFound();
            }

            //Update Data
            _mapper.Map(incomeUpdateDto, incomeModelFromRepo);

            //Updater
            _repository.UpdateIncome(incomeModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //PATCH api/spendster/incomes/{id}
        [HttpPatch("{id}")]
        public ActionResult PartialIncomeUpdate(int id, JsonPatchDocument<IncomeUpdateDto> patchDoc)
        {
            var incomeModelFromRepo = _repository.GetIncomeById(id);
            if (incomeModelFromRepo == null)
            {
                return NotFound();
            }

            var incomeToPatch = _mapper.Map<IncomeUpdateDto>(incomeModelFromRepo);
            patchDoc.ApplyTo(incomeToPatch, ModelState);
            if (!TryValidateModel(incomeToPatch))
            {
                return ValidationProblem(ModelState);
            }

            //Update Data
            _mapper.Map(incomeToPatch, incomeModelFromRepo);

            //Updater
            _repository.UpdateIncome(incomeModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //DELETE api/spendster/incomes/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteIncome(int id)
        {
            var incomeModelFromRepo = _repository.GetIncomeById(id);
            if (incomeModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteIncome(incomeModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }
    }
}