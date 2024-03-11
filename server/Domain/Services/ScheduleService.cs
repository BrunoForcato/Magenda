using Domain.Interfaces;
using Domain.Interfaces.InterfaceServices;
using Entitties.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly ISchedule _ISchedule;

        public ScheduleService(ISchedule iSchedule)
        {
            _ISchedule = iSchedule;
        }

        public async Task AddSchedule(Schedule schedule)
        {
            var validateTitle = schedule.ValidatePropertyString(schedule.Title, "Title");

            if(validateTitle)
            {
             await _ISchedule.Add(schedule);
            }
        }

        public async Task<List<Schedule>> GetAllSchedules()
        {
            return await _ISchedule.ListSchedules(n => n.Title != null);
        }

        public async Task<List<Schedule>> GetTodaySchedules()
        {
            return await _ISchedule.ListSchedules(n => n.ScheduleDate == DateTime.Today);
        }

        public async Task UpdateSchedule(Schedule schedule)
        {
            var validateTitle = schedule.ValidatePropertyString(schedule.Title, "Title");

            if (validateTitle)
            {
                await _ISchedule.Update(schedule);
            }
        }
    }
}
