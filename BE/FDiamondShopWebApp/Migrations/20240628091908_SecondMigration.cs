using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FDiamondShop.API.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__sub_categ__categ__30F848ED",
                table: "SubCategories");

            migrationBuilder.AlterColumn<int>(
                name: "category_id",
                table: "SubCategories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK__sub_categ__categ__30F848ED",
                table: "SubCategories",
                column: "category_id",
                principalTable: "Categories",
                principalColumn: "category_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__sub_categ__categ__30F848ED",
                table: "SubCategories");

            migrationBuilder.AlterColumn<int>(
                name: "category_id",
                table: "SubCategories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK__sub_categ__categ__30F848ED",
                table: "SubCategories",
                column: "category_id",
                principalTable: "Categories",
                principalColumn: "category_id");
        }
    }
}
