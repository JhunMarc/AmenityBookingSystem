using System.ComponentModel.DataAnnotations;

namespace AmenityBooking.API.Models
{
    public class Slot
    {
        public int Id { get; set; }
        public int AmenityId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsBooked { get; set; }

        // Navi Property
        public Amenity? Amenity { get; set; }

        // Concurency Ttoken
        [Timestamp]
        public byte[] RowVersion { get; set; } = Array.Empty<byte>();
    }
}