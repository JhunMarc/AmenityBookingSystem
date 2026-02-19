using AmenityBooking.API.Data;
using AmenityBooking.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmenityBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        // for reference this get: api/booking/amenities
        [HttpGet("amenities")]
        public async Task<ActionResult<IEnumerable<Amenity>>> GetAmenities()
        {
            return await _context.Amenities.ToListAsync();
        }

        // for referencee this get: api/booking/slots?amenityId=1&date=2023-10-27
        [HttpGet("slots")]
        public async Task<ActionResult<IEnumerable<object>>> GetSlots(int amenityId, DateTime date)
        {
            var slots = await _context.Slots
                .Where(s => s.AmenityId == amenityId && s.Date.Date == date.Date)
                .OrderBy(s => s.StartTime)
                .Select(s => new
                {
                    s.Id,
                    s.StartTime,
                    s.EndTime,
                    s.IsBooked
                })
                .ToListAsync();

            return Ok(slots);
        }

        // for reference post: api/booking/book
        [HttpPost("book")]
        public async Task<IActionResult> BookSlot([FromBody] CreateBookingDto request)
        {
            var slot = await _context.Slots.FindAsync(request.SlotId);

            if (slot == null) return NotFound("Slot not found");

            if (slot.IsBooked) return Conflict("Slot is already booked.");

            try
            {
                slot.IsBooked = true;

                var booking = new Booking
                {
                    SlotId = request.SlotId,
                    UserName = request.UserName,
                    EventName = request.EventName,
                    HeadCount = request.HeadCount
                };

                _context.Bookings.Add(booking);

                await _context.SaveChangesAsync();

                return Ok(new { Message = "Booking Successful" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("This slot was just booked by another user. Please refresh.");
            }
        }
    }
}