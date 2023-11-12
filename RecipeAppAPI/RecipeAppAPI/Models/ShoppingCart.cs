using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace recipeappAPI.Models
{
    public class ShoppingCart
    {
        [Key]
        public int Id { get; set; }
        public string food { get; set; }
        public int weight { get; set; }
        public string image { get; set; }
        [ForeignKey("savedRecipe")]
        public int savedRecipeId { get; set; }
    }
}
