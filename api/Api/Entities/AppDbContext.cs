using Microsoft.EntityFrameworkCore;

namespace Api.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoomUser>()
                .HasKey(x => new { x.RoomId, x.UserId});

            modelBuilder.Entity<RoomUser>()
                .HasOne(x => x.Room)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoomId);

            modelBuilder.Entity<RoomUser>()
                .HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId);
        }
    }
}
