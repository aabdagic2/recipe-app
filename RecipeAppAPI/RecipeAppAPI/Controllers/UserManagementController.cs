using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using recipeappAPI.Data;
using recipeappAPI.Models;

namespace recipeappAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

     
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserManagementController> _logger;
        public UserManagementController(UserManager<IdentityUser> userManager, IConfiguration configuration, ILogger<UserManagementController> logger, ApplicationDbContext context)
        {
            _userManager = userManager;
            _configuration=configuration;
            _logger = logger;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new IdentityUser { UserName = model.email, Email = model.email };

            var result = await _userManager.CreateAsync(user, model.password);
            var u = await _userManager.FindByEmailAsync(model.email);
            
            if (result.Succeeded&&u!=null)
            {

                var appUser = new AppUser(u.Id, model.name, model.surname, model.email, model.username, u.PasswordHash, model.calorieGoal, model.profileImage);

                // Save the appuser data to your database
                _context.AppUsers.Add(appUser);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Registration successful." });

            }

            // Registration failed
            return BadRequest(result.Errors);
        }
            

            // GET: api/UserManagement/5



                [HttpPost]
                [Route("login")]
                public async Task<IActionResult> Login([FromBody] LoginModel model)
                {
                    var user = await _userManager.FindByNameAsync(model.Email);
                    if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                    {


                        var authClaims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, user.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        };


                        var token = GetToken(authClaims);
                        var token1 = new JwtSecurityTokenHandler().WriteToken(token);
                        var t = new TokenValidity()
                        {
                            Token = token1,
                            IsValid = true // You can set this as needed
                        };

                        _context.TokenValidity.Add(t);
                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            user = user.Id
                        });
                    }
                    return Unauthorized();
                }
        [HttpPost]
        [Route("IsTokenValid")]
        public bool IsTokenValid(string jwt)
                {
                    var validity =_context.TokenValidity.FirstOrDefault(x => x.Token.Equals(jwt));
                    if(validity==null)throw new Exception("Token wasn't issued.");
                    if (validity != null && validity.IsValid == false)
                        throw new Exception("Token has been invalidated! Please login again.");

                    return true;
                }
        
                [HttpGet("logout")]
                public async Task<IActionResult> Logout(string jwt)
                {
                    var token = _context.TokenValidity.FirstOrDefault(x => x.Token.Equals(jwt));
                    if (token != null)
                        token.IsValid = false;

                    await _context.SaveChangesAsync();
            return Ok(true);
                }
        
        private JwtSecurityToken GetToken(List<Claim> authClaims)
                {
                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                        );

                    return token;
                }
        }

    }
