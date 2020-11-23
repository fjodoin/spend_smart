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
    [Route("api/spendster/expenses")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepo _repository;
        private readonly IMapper _mapper;

        public ExpensesController(IExpenseRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET api/spendster/expenses/
        [HttpGet]
        public ActionResult<IEnumerable<ExpenseReadDto>> GetAllExpenses()
        {
            var expenseItems = _repository.GetAllExpenses();
            var mappedExpenseItems = _mapper.Map<IEnumerable<ExpenseReadDto>>(expenseItems);

            //var page = new PaginatedResponse<Expense>(mappedExpenseItems);

            return Ok(mappedExpenseItems);
        }

        //GET api/spendster/expenses/{id}
        [HttpGet("{id}", Name = "GetExpenseById")]
        public ActionResult<ExpenseReadDto> GetExpenseById(int id)
        {
            var expenseItem = _repository.GetExpenseById(id);
            if (expenseItem != null)
            {
                return Ok(_mapper.Map<ExpenseReadDto>(expenseItem));
            }
            return NotFound();
        }

        //GET api/spendster/expenses/{year_month}
        [HttpGet("year_month={year_month}", Name = "GetExpensesByMonth")]
        public ActionResult<ExpenseReadDto> GetExpensesByMonth(DateTime year_month)
        {
            var expenseItems = _repository.GetExpensesByMonth(year_month);
            if (expenseItems != null)
            {
                return Ok(expenseItems);
            }
            return NotFound();
        }

        //GET api/spendster/expenses/{date1}&{date2}
        [HttpGet("date1={date1}&date2={date2}", Name = "GetExpensesByDates")]
        public ActionResult<ExpenseReadDto> GetExpensesByDates(DateTime date1, DateTime date2)
        {
            var expenseItems = _repository.GetExpensesByDates(date1, date2);
            if (expenseItems != null)
            {
                return Ok(expenseItems);
            }
            return NotFound();
        }

        //POST api/spendster/expenses/
        [HttpPost]
        public ActionResult<ExpenseReadDto> CreateExpense(ExpenseCreateDto expenseCreateDto)
        {
            var expenseModel = _mapper.Map<Expense>(expenseCreateDto);
            _repository.CreateExpense(expenseModel);
            _repository.SaveChanges();
            
            var expenseReadDto = _mapper.Map<ExpenseReadDto>(expenseModel);

            return CreatedAtRoute(nameof(GetExpenseById), new { Id = expenseReadDto.Id }, expenseReadDto);
        }

        //PUT api/spendster/expenses/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateExpense(int id, ExpenseUpdateDto expenseUpdateDto)
        {
            var expenseModelFromRepo = _repository.GetExpenseById(id);
            if (expenseModelFromRepo == null)
            {
                return NotFound();
            }

            //Update Data
            _mapper.Map(expenseUpdateDto, expenseModelFromRepo);

            //Updater
            _repository.UpdateExpense(expenseModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //PATCH api/spendster/expenses/{id}
        [HttpPatch("{id}")]
        public ActionResult PartialExpenseUpdate(int id, JsonPatchDocument<ExpenseUpdateDto> patchDoc)
        {
            var expenseModelFromRepo = _repository.GetExpenseById(id);
            if (expenseModelFromRepo == null)
            {
                return NotFound();
            }

            var expenseToPatch = _mapper.Map<ExpenseUpdateDto>(expenseModelFromRepo);
            patchDoc.ApplyTo(expenseToPatch, ModelState);
            if (!TryValidateModel(expenseToPatch))
            {
                return ValidationProblem(ModelState);
            }

            //Update Data
            _mapper.Map(expenseToPatch, expenseModelFromRepo);

            //Updater
            _repository.UpdateExpense(expenseModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //DELETE api/spendster/expenses/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteExpense(int id)
        {
            var expenseModelFromRepo = _repository.GetExpenseById(id);
            if(expenseModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteExpense(expenseModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }
    }
}