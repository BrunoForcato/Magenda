using Aplication.Interfaces;
using Entitties.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using WebAPI.Models;
using WebAPI.Token;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserAplication _IUserAplication;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;


        public UserController(IUserAplication IUserAplication)
        {
            _IUserAplication = IUserAplication;
  
        }


        [AllowAnonymous]
        [Produces("application/json")]
        [HttpPost("/api/CreateToken")]
        public async Task<IActionResult> CreateToken([FromBody] Login login)
        {
            if(string.IsNullOrWhiteSpace(login.email) || string.IsNullOrWhiteSpace(login.password))
            {
                return Unauthorized();
            }

            var result = await _IUserAplication.IsThereAUser(login.email, login.password);
            if(result)
            {
                var token = new TokenJWTBuilder()
                    .AddSecurityKey(JwtSecurityKey.Create("Magendaa746713717065429aff5411ad740c9d9"))
                    .AddSubject("Magenda")
                    .AddIssuer("Magenda.Securiry.Bearer")
                    .AddAudience("Magenda.Securiry.Bearer")
                    .AddClaim("UsuarioAPINumero", "1")
                    .AddExpiry(5)
                    .Builder();

                return Ok(token.value);
            }
            else
            {
                return Unauthorized();
            }
        }

        [AllowAnonymous]
        [Produces("application/json")]
        [HttpPost("/api/AddUser")]
        public async Task<IActionResult> AddUser([FromBody] Login login)
        {
            if (string.IsNullOrWhiteSpace(login.email) || string.IsNullOrWhiteSpace(login.password))
                return Ok("Falta alguns dados");

            var resultado = await
                _IUserAplication.AddUser(login.email, login.password);

            if (resultado)
                return Ok("Usuário Adicionado com Sucesso");
            else
                return Ok("Erro ao adicionar usuário " + resultado);
        }

    }
}
