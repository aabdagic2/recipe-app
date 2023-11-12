using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using recipeappAPI.Data;
using recipeappAPI.Models;

namespace recipeappAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FoodHistoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FoodHistoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FoodHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodHistory>>> GetFoodHistory(int id,DateTime d)
        {
          if (_context.FoodHistory == null)
          {
              return NotFound();
          }
        
            return await _context.FoodHistory
        .Where(x => x.userId == id.ToString() && x.date == DateTime.Today) // Use Date instead of date
        .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodHistory(int id, FoodHistory foodHistory)
        {
            if (id != foodHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(foodHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodHistoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FoodHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FoodHistory>> PostFoodHistory(FoodHistory foodHistory)
        {
          if (_context.FoodHistory == null)
          {
              return Problem("Entity set 'ApplicationDbContext.FoodHistory'  is null.");
          }
          foodHistory.date = DateTime.Today;
            _context.FoodHistory.Add(foodHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFoodHistory", new { id = foodHistory.Id }, foodHistory);
        }

        // DELETE: api/FoodHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodHistory(int id)
        {
            if (_context.FoodHistory == null)
            {
                return NotFound();
            }
            var foodHistory = await _context.FoodHistory.FindAsync(id);
            if (foodHistory == null)
            {
                return NotFound();
            }

            _context.FoodHistory.Remove(foodHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FoodHistoryExists(int id)
        {
            return (_context.FoodHistory?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
