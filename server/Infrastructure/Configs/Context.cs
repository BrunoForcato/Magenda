using Entitties.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configs
{
    public class Context : IdentityDbContext<User>
    {
        public Context()
        {

        }

        public Context(DbContextOptions<Context> options) : base(options) 
        {
        }

        public DbSet<Schedule> Schedule {  get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(GetConnectionString());
                base.OnConfiguring(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().ToTable("AspNetUsers").HasKey(t => t.Id);

            base.OnModelCreating(builder);
        }

        public string GetConnectionString()
        {
            string strcon = "Data Source=.\\SQLEXPRESS;Initial Catalog=Magenda_Server;Integrated Security=False;Trusted_Connection=True;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False";
            return strcon;
        }
    }
}
