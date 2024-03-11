using Aplication.Interfaces;
using Entitties.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleAplication _IScheduleAplication;
        public ScheduleController(IScheduleAplication IScheduleAplication)
        {
            _IScheduleAplication = IScheduleAplication;
        }

        [Authorize]
        [Produces("application/json")]
        [HttpPost("/api/CreateSchedule")]
        public async Task<IActionResult> CreateSchedule([FromBody] ScheduleModel scheduleModel)
        {
            if (string.IsNullOrWhiteSpace(scheduleModel.title) || string.IsNullOrWhiteSpace(scheduleModel.date.ToString()))
                return Ok("Falta alguns dados");

            var newSchedule = new Schedule();
            newSchedule.Title = scheduleModel.title;
            newSchedule.ScheduleDate = scheduleModel.date;
            newSchedule.Observation = scheduleModel.observation;

            await _IScheduleAplication.AddSchedule(newSchedule);

            return Ok(newSchedule.Notifies);
        }

        [Authorize]
        [Produces("application/json")]
        [HttpPost("/api/UpdateSchedule")]
        public async Task<IActionResult> UpdateSchedule([FromBody] ScheduleModel scheduleModel)
        {
            if (string.IsNullOrWhiteSpace(scheduleModel.title) || string.IsNullOrWhiteSpace(scheduleModel.date.ToString()))
                return Ok("Falta alguns dados");

            var newSchedule = await _IScheduleAplication.GetById(scheduleModel.Id);
            newSchedule.Title = scheduleModel.title;
            newSchedule.ScheduleDate = scheduleModel.date;
            newSchedule.Observation = scheduleModel.observation;

            await _IScheduleAplication.UpdateSchedule(newSchedule);

            return Ok(newSchedule.Notifies);
        }

        [Authorize]
        [Produces("application/json")]
        [HttpPost("/api/RemoveSchedule")]
        public async Task<IActionResult> RemoveSchedule([FromBody] ScheduleModel scheduleModel)
        {

            var newSchedule = await _IScheduleAplication.GetById(scheduleModel.Id);

            await _IScheduleAplication.Delete(newSchedule);

            return Ok(newSchedule.Notifies);
        }

        [Authorize]
        [Produces("application/json")]
        [HttpGet("/api/GetAllSchedules")]
        public async Task<List<Schedule>> GetAllSchedules()
        {
            return await _IScheduleAplication.GetAll();
  
        }

        [Authorize]
        [Produces("application/json")]
        [HttpGet("/api/GetTodaySchedules")]
        public async Task<List<Schedule>> GetTodaySchedules()
        {
            return await _IScheduleAplication.GetTodaySchedules();

        }

        [Authorize]
        [Produces("application/json")]
        [HttpGet("/api/GetScheduleById")]
        public async Task<Schedule> GetScheduleById(int id)
        {
            return await _IScheduleAplication.GetById(id);
        }

        [Authorize]
        [Produces("application/json")]
        [HttpGet("/api/GetSchedulesCount")]
        public async Task<int> GetSchedulesCount()
        {
            var listOfSchedules = await _IScheduleAplication.GetAll();
            return listOfSchedules.Count;

        }
    }
}
