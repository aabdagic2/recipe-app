using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recipeappAPI.Migrations
{
    /// <inheritdoc />
    public partial class SavedRecMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedRecipes_AppUsers_appUserId",
                table: "SavedRecipes");

            migrationBuilder.DropIndex(
                name: "IX_SavedRecipes_appUserId",
                table: "SavedRecipes");

            migrationBuilder.DropColumn(
                name: "appUserId",
                table: "SavedRecipes");

            migrationBuilder.RenameColumn(
                name: "uri",
                table: "SavedRecipes",
                newName: "Url");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "SavedRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DietLabels",
                table: "SavedRecipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Servings",
                table: "SavedRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Time",
                table: "SavedRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "SavedRecipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "SavedRecipes");

            migrationBuilder.DropColumn(
                name: "DietLabels",
                table: "SavedRecipes");

            migrationBuilder.DropColumn(
                name: "Servings",
                table: "SavedRecipes");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "SavedRecipes");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "SavedRecipes");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "SavedRecipes",
                newName: "uri");

            migrationBuilder.AddColumn<string>(
                name: "appUserId",
                table: "SavedRecipes",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipes_appUserId",
                table: "SavedRecipes",
                column: "appUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedRecipes_AppUsers_appUserId",
                table: "SavedRecipes",
                column: "appUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
