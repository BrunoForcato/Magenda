using Domain.Interfaces;
using Entitties.Entities;
using Infrastructure.Configs;
using Infrastructure.Repositories.Generics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ScheduleRepository : GenericRepository<Schedule>, ISchedule
    {
        private readonly DbContextOptions<Context> _OptionsBuilder;

        public ScheduleRepository()
        {
            _OptionsBuilder = new DbContextOptions<Context>();
        }

        public int CountSchedules(Expression<Func<Schedule, bool>> exSchedule)
        {
            using (var data = new Context(_OptionsBuilder))
            {
                return data.Schedule.Where(exSchedule).Count();
            }
        }

        public async Task<List<Schedule>> ListSchedules(Expression<Func<Schedule, bool>> exSchedule)
        {
            using (var data = new Context(_OptionsBuilder))
            {
                return await data.Schedule.Where(exSchedule).AsNoTracking().ToListAsync();
            }
        }
    }
}
