using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecipeAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;
namespace RecipeAppAPI.Data
{


  
        public class AppDbContext : IdentityDbContext
        {
            public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
            {
            }

            public DbSet<RatedRecipe> RatedRecipe{ get; set; }
            public DbSet<SavedRecipe> SavedRecipes { get; set; }
            public DbSet<TodayCalorie> TodayCalorie { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<RatedRecipe>().ToTable("RatedRecipe");
                modelBuilder.Entity<SavedRecipe>().ToTable("SavedRecipes");
                modelBuilder.Entity<TodayCalorie>().ToTable("TodayCalorie");
         
                base.OnModelCreating(modelBuilder);
            }




        }
    }

