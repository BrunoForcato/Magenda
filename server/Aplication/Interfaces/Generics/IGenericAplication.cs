﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces.Generics
{
    public interface IGenericAplication<T> where T : class
    {
        Task Add(T Object);

        Task Update(T Object);

        Task Delete(T Object);

        Task<T> GetById(int Id);

        Task<List<T>> GetAll();
    }
}
