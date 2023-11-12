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
    public class PastMessagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PastMessagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PastMessages

        // GET: api/PastMessages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PastMessages>> GetPastMessagesForUser(int userId)
        {
          if (_context.PastMessages == null)
          {
              return NotFound();
          }
            var pastMessages = await _context.PastMessages.FindAsync(userId);

            if (pastMessages == null)
            {
                return NotFound();
            }

            return pastMessages;
        }

        // PUT: api/PastMessages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPastMessages(int id, PastMessages pastMessages)
        {
            if (id != pastMessages.Id)
            {
                return BadRequest();
            }

            _context.Entry(pastMessages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PastMessagesExists(id))
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

        // POST: api/PastMessages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PastMessages>> PostPastMessages(PastMessages pastMessages)
        {
          if (_context.PastMessages == null)
          {
              return Problem("Entity set 'ApplicationDbContext.PastMessages'  is null.");
          }
            _context.PastMessages.Add(pastMessages);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPastMessages", new { id = pastMessages.Id }, pastMessages);
        }

        // DELETE: api/PastMessages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePastMessages(int id)
        {
            if (_context.PastMessages == null)
            {
                return NotFound();
            }
            var pastMessages = await _context.PastMessages.FindAsync(id);
            if (pastMessages == null)
            {
                return NotFound();
            }

            _context.PastMessages.Remove(pastMessages);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PastMessagesExists(int id)
        {
            return (_context.PastMessages?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
