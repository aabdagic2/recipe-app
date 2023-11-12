using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace recipeappAPI.Models
{
    public class PastMessages
    {
        [Key]
        public int Id { get; set; }
        public string text {  get; set; }
        public bool chat {  get; set; }
        [ForeignKey("userId")]
        public string userId { get; set; }
        public AppUser appUser { get; set; }
    }
}
