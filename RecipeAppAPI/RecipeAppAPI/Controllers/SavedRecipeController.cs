using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using RecipeAppAPI.Models;
using System.Data.SqlClient;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeAppAPI.Controllers
{
    [Route("api/savedrecipes")]
    [ApiController]
    public class SavedRecipeController : ControllerBase
    {
        
    
   

// GET: api/<SavedRecipeController>
[HttpGet]
        public IEnumerable<SavedRecipe> Get()
        {
            

            // Retrieve the connection string from the configuration
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";
            List<SavedRecipe> recipe = new List<SavedRecipe>();
            // Create a SqlConnection object with the connection string
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("select * from savedrecipes",connection);
                    MySqlDataReader reader = cmd.ExecuteReader();
                   
                    while (reader.Read()) {
                        SavedRecipe rec = new SavedRecipe();
                        rec.ID = Convert.ToInt32(reader["ID"]);
                        rec.name = reader["name"].ToString();
                        rec.image = reader["image"].ToString();
                        rec.description = reader["description"].ToString();
                        rec.rating= Convert.ToInt32(reader["rating"]);
                        recipe.Add(rec);
                    }
                    Console.WriteLine("Connection opened successfully!");

                    connection.Close();
                }
                catch (Exception ex)
                {
                   
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }

            return recipe;
        }

        // GET api/<SavedRecipeController>/5


        // POST api/<SavedRecipeController>
        [HttpPost]
        public void Post([FromBody] SavedRecipe recipe)
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";
    
    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        try
        {
            connection.Open();
            MySqlCommand cmd = new MySqlCommand("INSERT INTO savedrecipes (name, image, description, rating) VALUES (@name, @image, @description, @rating)", connection);
            cmd.Parameters.AddWithValue("@name", recipe.name);
            cmd.Parameters.AddWithValue("@image", recipe.image);
            cmd.Parameters.AddWithValue("@description", recipe.description);
            cmd.Parameters.AddWithValue("@rating", recipe.rating);
            cmd.ExecuteNonQuery();
            
            connection.Close();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
        }



        // DELETE api/<SavedRecipeController>/5
        [HttpDelete("{name}")]
        public void Delete(String name)
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("DELETE FROM savedrecipes WHERE name = @id", connection);
                    cmd.Parameters.AddWithValue("@id", name);
                    cmd.ExecuteNonQuery();

                    connection.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
        }
    }
}
