using Domain.Interfaces;
using Entitties.Entities;
using Infrastructure.Configs;
using Infrastructure.Repositories.Generics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUser
    {
        private readonly DbContextOptions<Context> _OptionsBuilder;

        public UserRepository()
        {
            _OptionsBuilder = new DbContextOptions<Context>();
        }

        public async Task<bool> AddUser(string email, string senha)
        {

            try
            {
                using (var data = new Context(_OptionsBuilder))
                {
                    await data.User.AddAsync(
                          new User
                          {
                              Email = email,
                              PasswordHash = senha,
                          });

                    await data.SaveChangesAsync();

                }
            }
            catch (Exception)
            {
                return false;
            }


            return true;

        }

        public async Task<bool> IsThereAUser(string email, string password)
        {
            try
            {
                using (var data = new Context(_OptionsBuilder))
                {
                    return await data.User.Where(u => u.Email.Equals(email) && u.PasswordHash.Equals(password)).AsNoTracking().AnyAsync();
                }
            }
            catch(Exception)
            {
                return false;
            }
        }
    }
}
