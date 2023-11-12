using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeAppAPI.Controllers
{
    [Route("api/recipes")]
    [ApiController]
    public class RecipeController : ControllerBase
    {

        private readonly HttpClient httpClient;

        public RecipeController(IHttpClientFactory httpClientFactory)
        {
            httpClient = httpClientFactory.CreateClient();
        }
        [Route("Get")]
        [ResponseCache(Duration = 3600)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                string appId = "89c68f46";
                string appKey = "41fb7f41e7818b87c557110853921ded";
                string url = "";
                if (DateTime.UtcNow.Hour >= 6 && DateTime.UtcNow.Hour <= 11)
                {
                    url = $"https://api.edamam.com/api/recipes/v2?type=any&mealType=Breakfast&app_id={appId}&app_key={appKey}";
                }
                else if (DateTime.UtcNow.Hour >= 12 && DateTime.UtcNow.Hour <= 17)
                {
                    url = $"https://api.edamam.com/api/recipes/v2?type=any&mealType=Lunch&app_id={appId}&app_key={appKey}";
                }
                else if (DateTime.UtcNow.Hour >= 18 && DateTime.UtcNow.Hour <= 22)
                {
                    url = $"https://api.edamam.com/api/recipes/v2?type=any&mealType=Dinner&app_id={appId}&app_key={appKey}";
                }
                else
                {
                    url = $"https://api.edamam.com/api/recipes/v2?type=any&mealType=Snack&app_id={appId}&app_key={appKey}";
                }
                // Send the HTTP GET request
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as JSON
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Route("GetByMealType/{type}")]
        [HttpGet]
        public async Task<IActionResult> GetByMealType(string type)
        {
            try
            {
                string appId = "89c68f46";
                string appKey = "41fb7f41e7818b87c557110853921ded";
                string url = $"https://api.edamam.com/api/recipes/v2?type=any&mealType={type}&app_id={appId}&app_key={appKey}";


                // Send the HTTP GET request
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as JSON
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Route("GetByHealth")]
        [HttpGet]
        public async Task<IActionResult> GetByHealth(string healthLabel)
        {
            try
            {
                string appId = "89c68f46";
                string appKey = "41fb7f41e7818b87c557110853921ded";
                string url = $"https://api.edamam.com/api/recipes/v2?type=any&health={healthLabel}&app_id={appId}&app_key={appKey}";
                

                // Send the HTTP GET request
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as JSON
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Route("GetByDiet")]
        [HttpGet]
        public async Task<IActionResult> GetByDiet(string dietLabel)
        {
            try
            {
                string appId = "89c68f46";
                string appKey = "41fb7f41e7818b87c557110853921ded";
                string url = $"https://api.edamam.com/api/recipes/v2?type=any&diet={dietLabel}&app_id={appId}&app_key={appKey}";


                // Send the HTTP GET request
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as JSON
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Route("GetByCalories")]
        [HttpGet]
        public async Task<IActionResult> GetByCalories(int min, int max)
        {
            try
            {
                string appId = "89c68f46";
                string appKey = "41fb7f41e7818b87c557110853921ded";
                string url = $"https://api.edamam.com/api/recipes/v2?type=any&calories={min}-{max}&app_id={appId}&app_key={appKey}";

                // Send the HTTP GET request
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as JSON
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Route("GetRecipeByName/{name}")]
        [HttpGet]
        public async Task<IActionResult> GetRecipeByName(string name)
        {
            try
            {
                string appId = "89c68f46";
                string appKey = "41fb7f41e7818b87c557110853921ded";
                string url = $"https://api.edamam.com/api/recipes/v2?type=any&q={name}&app_id={appId}&app_key={appKey}";

                // Send the HTTP GET request
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as JSON
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


    }
}

