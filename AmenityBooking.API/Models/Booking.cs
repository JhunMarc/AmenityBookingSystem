namespace AmenityBooking.API.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int SlotId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string EventName { get; set; } = string.Empty;
        public int HeadCount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Slot? Slot { get; set; }
    }

    // DTO for incoming requests
    public record CreateBookingDto(int SlotId, string UserName, string EventName, int HeadCount);
}