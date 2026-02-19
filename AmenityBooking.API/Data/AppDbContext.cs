using AmenityBooking.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AmenityBooking.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Amenity> Amenities => Set<Amenity>();
        public DbSet<Slot> Slots => Set<Slot>();
        public DbSet<Booking> Bookings => Set<Booking>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure RowVersion for concurrency
            modelBuilder.Entity<Slot>()
                .Property(s => s.RowVersion)
                .IsRowVersion();
        }
    }
}