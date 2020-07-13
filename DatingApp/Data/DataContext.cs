using DatingApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class DataContext : DbContext {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Cafe> Cafe { get; set; }
        public DbSet<Like> Likes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<Like>().HasKey(key => new { key.LikerId, key.LikeeId });
            builder.Entity<Like>()
                .HasOne(user => user.Likee)
                .WithMany(user => user.Likers)
                .HasForeignKey(user => user.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(user => user.Liker)
                .WithMany(user => user.Likees)
                .HasForeignKey(user => user.LikerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
