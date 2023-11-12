namespace recipeappAPI.Models
{
    public class AddToShoppingCartModel
    {
        public SavedRecipe Recipe { get; set; }
        public ShoppingCart CartItem { get; set; }
    }

}
