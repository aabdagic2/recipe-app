using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using RecipeAppAPI.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeAppAPI.Controllers
{
    [Route("api/ratedrecipes")]
    [ApiController]
    public class RatedRecipeController : ControllerBase
    {
        // GET: api/<RatedRecipeController>

        // GET api/<RatedRecipeController>/5
        [HttpGet("{name}")]
        public int Get(string name)
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("SELECT * FROM ratedrecipes WHERE name = @name", connection);
                    cmd.Parameters.AddWithValue("@name", name);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    int result = 0;

                    while (reader.Read())
                    {
                       
                        result = Convert.ToInt32(reader["rating"]);
                       
                    }

                    connection.Close();

                    return result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    return -1;
                }
            }
        }


        // POST api/<RatedRecipeController>
        [HttpPut]
        public void Put([FromBody] RatedRecipe r)
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO ratedrecipes (name, rating) VALUES (@name, @rating) ON DUPLICATE KEY UPDATE rating = @rating", connection);
                    cmd.Parameters.AddWithValue("@name", r.name);
                    cmd.Parameters.AddWithValue("@rating", r.rating);
                    cmd.ExecuteNonQuery();

                    connection.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
        }




        // PUT api/<RatedRecipeController>/5

    }
}
