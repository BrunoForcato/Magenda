using Aplication.Interfaces.Generics;
using Entitties.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces
{
    public interface IScheduleAplication : IGenericAplication<Schedule>
    {
        Task AddSchedule(Schedule schedule);

        Task UpdateSchedule(Schedule schedule);

        Task<List<Schedule>> GetAllSchedules();

        Task<List<Schedule>> GetTodaySchedules();
    }
}
