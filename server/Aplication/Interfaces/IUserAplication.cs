using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces
{
    public interface IUserAplication
    {
        Task<bool> IsThereAUser(string email, string password);
        Task<bool> AddUser(string email, string senha);
    }
}
