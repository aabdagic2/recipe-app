using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace recipeappAPI.Models
{
   public class AppUser
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int CalorieGoal { get; set; }
        public string ProfileImage { get; set; }
        public AppUser() { }
         public AppUser(string id, string name, string surname, string email, string username, string password, int calorieGoal, string profileImage)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Email = email;
            Username = username;
            Password = password;
            CalorieGoal = calorieGoal;
            ProfileImage = profileImage;
        }
    }
}
