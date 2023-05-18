using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using RecipeAppAPI.Models;
using System.Xml.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeAppAPI.Controllers
{
    [Route("api/todaycalories")]
    [ApiController]
    public class TodayCalorieController : ControllerBase
    {
        // GET: api/<TodayCalorieController>
        [HttpGet("get")]
        public IEnumerable<TodayCalorie> GetTodayCalories()
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                List<TodayCalorie> rec = new List<TodayCalorie>();
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("SELECT * FROM todaycalories WHERE dateTime = @dateTime", connection);
                    cmd.Parameters.AddWithValue("@dateTime", DateTime.Today.ToString());


                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        TodayCalorie result = new TodayCalorie();
                        result.ID = Convert.ToInt32(reader["ID"]);
                        result.name = reader["name"].ToString();
                        result.image = reader["image"].ToString();
                        result.description = reader["description"].ToString();
                        result.rating = Convert.ToInt32(reader["rating"]);
                       
                        result.calories = Convert.ToDouble(reader["calories"]);
                        rec.Add(result);
                    }

                    connection.Close();

                    return rec;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    
                    return rec;
                }
            }
        }

        // GET api/<TodayCalorieController>/5


        // POST api/<TodayCalorieController>
        [HttpPost("/create")]
        public IActionResult Post([FromBody] TodayCalorie todayCalorie)
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO todaycalories (name, image, description, rating, dateTime, calories) VALUES (@name, @image, @description, @rating, @dateTime, @calories)", connection);
                    cmd.Parameters.AddWithValue("@name", todayCalorie.name);
                    cmd.Parameters.AddWithValue("@image", todayCalorie.image);
                    cmd.Parameters.AddWithValue("@description", todayCalorie.description);
                    cmd.Parameters.AddWithValue("@rating", todayCalorie.rating);
                    cmd.Parameters.AddWithValue("@dateTime", DateTime.Today.ToString());
                    cmd.Parameters.AddWithValue("@calories", todayCalorie.calories);
                    cmd.ExecuteNonQuery();

                    connection.Close();

                    return Ok(); // Return 200 OK status code
                }
                catch (Exception ex)
                {
                    // Log the error using a logging framework
                   
                    return StatusCode(500); // Return 500 Internal Server Error status code
                }
            }
        }


        // DELETE api/<TodayCalorieController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("DELETE FROM todaycalories WHERE ID = @id", connection);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();

                    connection.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
        }

        [HttpDelete]
        public void Delete()
        {
            var connectionString = "Server=localhost;User Id=root;database=recipes;password=";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    DateTime today = DateTime.Today;
                    MySqlCommand cmd = new MySqlCommand("DELETE FROM todaycalories WHERE DATE(dateTime) <> @today", connection);
                    cmd.Parameters.AddWithValue("@today", today);
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
