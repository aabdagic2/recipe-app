using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace recipeappAPI.Models
{
    public class FoodHistory
    {
        [Key]
        public int Id { get; set; }
        public string calories { get; set; }
        public string recipeUri {  get; set; }
        public string recipeName {  get; set; }
        public string foodName {  get; set; }
        public string foodId {  get; set; }
        public DateTime date { get; set; }
        public string image {  get; set; }
        public bool chat { get; set; }
        [ForeignKey("userId")]
        public string userId { get; set; }
        public AppUser appUser { get; set; }
    }
}
