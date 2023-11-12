using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace recipeappAPI.Models
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public byte[] ImageData { get; set; }
        [ForeignKey("userId")]
        public string userId { get; set; }
        public AppUser appUser { get; set; }
    }
}
