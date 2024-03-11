using Aplication.Interfaces;
using Domain.Interfaces;
using Domain.Interfaces.InterfaceServices;
using Domain.Services;
using Entitties.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Aplications
{
    public class ScheduleAplication : IScheduleAplication
    {
        ISchedule _ISchedule;
        IScheduleService _IScheduleService;

        public ScheduleAplication(ISchedule ISchedule, IScheduleService IScheduleService)
        {
            _ISchedule = ISchedule;
            _IScheduleService = IScheduleService;
        }

        public async Task Add(Schedule Object)
        {
            await _ISchedule.Add(Object);
        }

        public async Task Update(Schedule Object)
        {
            await _ISchedule.Update(Object);
        }

        public async Task<Schedule> GetById(int Id)
        {
            return await _ISchedule.GetById(Id);
        }

        public async Task Delete(Schedule Object)
        {
            await _ISchedule.Delete(Object);
        }

        public async Task<List<Schedule>> GetAll()
        {
            return await _ISchedule.GetAll();
        }

        public async Task AddSchedule(Schedule schedule)
        {
            await _IScheduleService.AddSchedule(schedule);
        }

        public async Task UpdateSchedule(Schedule schedule)
        {
            await _IScheduleService.UpdateSchedule(schedule);
        }

        public async Task<List<Schedule>> GetAllSchedules()
        {
            return await _IScheduleService.GetAllSchedules();
        }

        public async Task<List<Schedule>> GetTodaySchedules()
        {
            return await _IScheduleService.GetTodaySchedules();
        }

    }
}
