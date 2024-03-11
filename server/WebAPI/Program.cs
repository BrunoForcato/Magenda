using Aplication.Aplications;
using Aplication.Interfaces;
using Domain.Interfaces;
using Domain.Interfaces.Generics;
using Domain.Interfaces.InterfaceServices;
using Domain.Services;
using Entitties.Entities;
using Infrastructure.Configs;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Generics;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Token;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<Context>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = false)
                .AddEntityFrameworkStores<Context>();

            //Interfaces
            builder.Services.AddSingleton(typeof(IGenerics<>), typeof(GenericRepository<>));
            builder.Services.AddSingleton<ISchedule, ScheduleRepository>();
            builder.Services.AddSingleton<IUser, UserRepository>();

            //Domain
            builder.Services.AddSingleton<IScheduleService, ScheduleService>();

            //Aplication
            builder.Services.AddSingleton<IScheduleAplication, ScheduleAplication>();
            builder.Services.AddSingleton<IUserAplication, UserAplication>();

            //Token
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(option =>
              {
                  option.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuer = false,
                      ValidateAudience = false,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,

                      ValidIssuer = "Magenda.Securiry.Bearer",
                      ValidAudience = "Magenda.Securiry.Bearer",
                      IssuerSigningKey = JwtSecurityKey.Create("Magendaa746713717065429aff5411ad740c9d9")
                  };

                  option.Events = new JwtBearerEvents
                  {
                      OnAuthenticationFailed = context =>
                      {
                          Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                          return Task.CompletedTask;
                      },
                      OnTokenValidated = context =>
                      {
                          Console.WriteLine("OnTokenValidated: " + context.SecurityToken);
                          return Task.CompletedTask;
                      }
                  };
              });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            var urlDev = "http://localhost:4200";
            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader().WithOrigins(urlDev));

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}