using AmenityBooking.API.Models;

namespace AmenityBooking.API.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Amenities.Any()) return;

            var amenities = new[]
            {
                new Amenity { Name = "The Theatre", Type = "Cinema", Icon = "film" },
                new Amenity { Name = "The Grove", Type = "Cinema", Icon = "tree" },
                new Amenity { Name = "Pulse", Type = "Cinema", Icon = "activity" },
                new Amenity { Name = "Unwind", Type = "Party Hall", Icon = "music" },
                new Amenity { Name = "Sculpt", Type = "GYM", Icon = "dumbbell" },
                new Amenity { Name = "Flow", Type = "Yoga Deck", Icon = "wind" },
            };

            context.Amenities.AddRange(amenities);
            context.SaveChanges();

            //  Slots for 7 days from today;s date
            var slots = new List<Slot>();
            var today = DateTime.Today;

            foreach (var amenity in amenities)
            {
                for (int day = 0; day < 7; day++)
                {
                    var date = today.AddDays(day);
                    // slot only for 6 am to 10 am rangee
                    for (int hour = 6; hour < 10; hour++)
                    {
                        slots.Add(new Slot
                        {
                            AmenityId = amenity.Id,
                            Date = date,
                            StartTime = new TimeSpan(hour, 0, 0),
                            EndTime = new TimeSpan(hour + 1, 0, 0),
                            IsBooked = false
                        });
                    }
                }
            }
            context.Slots.AddRange(slots);
            context.SaveChanges();
        }
    }
}