using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RecipeAppAPI.Models
{
    public class RatedRecipe
    {
        [Key]
        public int ID { get; set; }

        public String name { get; set; }

        public int rating { get; set; }

        public RatedRecipe() { }
    }
}
