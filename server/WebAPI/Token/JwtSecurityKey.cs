using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebAPI.Token
{
    public class JwtSecurityKey
    {
        public static SymmetricSecurityKey Create(string key)
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
        }
    }
}
