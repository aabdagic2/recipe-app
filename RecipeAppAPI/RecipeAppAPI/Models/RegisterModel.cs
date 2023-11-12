namespace recipeappAPI.Models
{
    public class RegisterModel
    {
        public string name { get; set; }
        public string surname { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int calorieGoal { get; set; }
        public string profileImage { get; set; }
    }
}
