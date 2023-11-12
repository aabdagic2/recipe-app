using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using recipeappAPI.Models;
using System.Diagnostics.Eventing.Reader;
using System.Reflection.Emit;

namespace recipeappAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<FoodHistory> FoodHistory{ get; set; }
        public DbSet<SavedRecipe> SavedRecipes { get; set; }
        public DbSet<ShoppingCart> ShoppingCart {  get; set; }
        public DbSet<PastMessages> PastMessages{ get; set; }
        public DbSet<TokenValidity> TokenValidity { get; set; }
        public DbSet<Photo> Photo { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>().ToTable("AppUsers");
            modelBuilder.Entity<FoodHistory>().ToTable("FoodHistory");
            modelBuilder.Entity<SavedRecipe>().ToTable("SavedRecipes");
            modelBuilder.Entity<ShoppingCart>().ToTable("ShoppingCart");
            modelBuilder.Entity<PastMessages>().ToTable("PastMessages");
            modelBuilder.Entity<TokenValidity>().ToTable("TokenValidities");
            modelBuilder.Entity<Photo>().ToTable("Photos");
        }

 
     





    }
}

