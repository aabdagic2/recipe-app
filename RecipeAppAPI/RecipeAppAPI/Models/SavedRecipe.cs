using System.ComponentModel.DataAnnotations;

namespace RecipeAppAPI.Models
{
    public class SavedRecipe
    {
      
            [Key]
            public int ID { get; set; }

            public String name { get; set; }
            public String image { get; set; }
            public String description { get; set; }
            public int rating { get; set; }

            public SavedRecipe() { }
  
        
    }
}
