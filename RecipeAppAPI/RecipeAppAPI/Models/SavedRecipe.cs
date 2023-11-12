using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace recipeappAPI.Models
{
    public class SavedRecipe
    {
        [Key]
        public int Id { get; set; }
        public string Title {  get; set; }
        public int Calories {  get; set; }
        public int Time {  get; set; }
        public int Servings {  get; set; }
        public string DietLabels { get; set; }
        public string ProfileImage {  get; set; }
        public string Url { get; set; }
        [ForeignKey("userId")]
        public string userId {  get; set; }
        
        public SavedRecipe() { }
    }
}
