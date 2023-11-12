using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recipeappAPI.Migrations
{
    /// <inheritdoc />
    public partial class SavedRecMig2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileImage",
                table: "SavedRecipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "SavedRecipes");
        }
    }
}
