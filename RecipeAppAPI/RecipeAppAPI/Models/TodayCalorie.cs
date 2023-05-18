using System.ComponentModel.DataAnnotations;

namespace RecipeAppAPI.Models
{
    public class TodayCalorie
    {
        [Key]
        public int ID { get; set; }

        public String name { get; set; }
        public String image { get; set; }
        public String description { get; set; }
        public int rating { get; set; }
        public DateTime dateTime{ get; set;}
        public Double calories { get; set; }

        public TodayCalorie() { }
    }
}
