using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;

        public UsersController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Email, userDto.Password);

            if (user == null)
                return BadRequest(new {message = "Email or password is incorrect"});

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            
            return Ok(new
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            var user = new User
            {
                Email = userDto.Email,
                Name = userDto.Name
            };

            try
            {
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserDto userDto)
        {
            var user = new User
            {
                Id = userDto.Id,
                Email = userDto.Email,
                Name = userDto.Name
            };

            try
            {
                _userService.Update(user, userDto.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}