using Domain.Interfaces.Generics;
using Entitties.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ISchedule : IGenerics<Schedule>
    {
        Task<List<Schedule>> ListSchedules(Expression<Func<Schedule, bool>> exSchedule);

    }
}
