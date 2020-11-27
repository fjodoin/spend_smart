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
    [Route("api/spendster/bills")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly IBillRepo _repository;
        private readonly IMapper _mapper;

        public BillsController(IBillRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET api/spendster/bills/
        [HttpGet]
        public ActionResult<IEnumerable<BillReadDto>> GetAllBills()
        {
            var billItems = _repository.GetAllBills();
            var mappedBillItems = _mapper.Map<IEnumerable<BillReadDto>>(billItems);

            return Ok(mappedBillItems);
        }

        //GET api/spendster/bills/{id}
        [HttpGet("{id}", Name = "GetBillById")]
        public ActionResult<BillReadDto> GetBillById(int id)
        {
            var billItem = _repository.GetBillById(id);
            if (billItem != null)
            {
                return Ok(_mapper.Map<BillReadDto>(billItem));
            }
            return NotFound();
        }

        //GET api/spendster/bills/{year_month}
        [HttpGet("year_month={year_month}", Name = "GetBillsByMonth")]
        public ActionResult<BillReadDto> GetBillsByMonth(DateTime year_month)
        {
            var billItems = _repository.GetBillsByMonth(year_month);
            if (billItems != null)
            {
                return Ok(billItems);
            }
            return NotFound();
        }

        //GET api/spendster/bills/{date1}&{date2}
        [HttpGet("date1={date1}&date2={date2}", Name = "GetBillsByDates")]
        public ActionResult<BillReadDto> GetBillsByDates(DateTime date1, DateTime date2)
        {
            var billItems = _repository.GetBillsByDates(date1, date2);
            if (billItems != null)
            {
                return Ok(billItems);
            }
            return NotFound();
        }

        //POST api/spendster/bills/
        [HttpPost]
        public ActionResult<BillReadDto> CreateBill(BillCreateDto billCreateDto)
        {
            var billModel = _mapper.Map<Bill>(billCreateDto);
            _repository.CreateBill(billModel);
            _repository.SaveChanges();

            var billReadDto = _mapper.Map<BillReadDto>(billModel);

            return CreatedAtRoute(nameof(GetBillById), new { Id = billReadDto.Id }, billReadDto);
        }

        //PUT api/spendster/bills/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateBill(int id, BillUpdateDto billUpdateDto)
        {
            var billModelFromRepo = _repository.GetBillById(id);
            if (billModelFromRepo == null)
            {
                return NotFound();
            }

            //Update Data
            _mapper.Map(billUpdateDto, billModelFromRepo);

            //Updater
            _repository.UpdateBill(billModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //PATCH api/spendster/bills/{id}
        [HttpPatch("{id}")]
        public ActionResult PartialBillUpdate(int id, JsonPatchDocument<BillUpdateDto> patchDoc)
        {
            var billModelFromRepo = _repository.GetBillById(id);
            if (billModelFromRepo == null)
            {
                return NotFound();
            }

            var billToPatch = _mapper.Map<BillUpdateDto>(billModelFromRepo);
            patchDoc.ApplyTo(billToPatch, ModelState);
            if (!TryValidateModel(billToPatch))
            {
                return ValidationProblem(ModelState);
            }

            //Update Data
            _mapper.Map(billToPatch, billModelFromRepo);

            //Updater
            _repository.UpdateBill(billModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }

        //DELETE api/spendster/bills/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteBill(int id)
        {
            var billModelFromRepo = _repository.GetBillById(id);
            if (billModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteBill(billModelFromRepo);

            //Save Changes
            _repository.SaveChanges();

            return NoContent();
        }
    }
}