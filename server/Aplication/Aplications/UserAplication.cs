using Aplication.Interfaces;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Aplications
{
    public class UserAplication : IUserAplication
    {
        IUser _IUser;

        public UserAplication(IUser IUser)
        {
            _IUser = IUser;
        }

        public async Task<bool> AddUser(string email, string password)
        {
            return await _IUser.AddUser(email, password);
        }

        public async Task<bool> IsThereAUser(string email, string password)
        {
            return await _IUser.IsThereAUser(email, password);
        }
    }
}
