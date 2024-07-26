using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FDiamondShop.API.Migrations
{
    /// <inheritdoc />
    public partial class NinthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderManagementStaffId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: 0);


            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_OrderManagementStaffId",
                table: "Orders",
                column: "OrderManagementStaffId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_OrderManagementStaffId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderManagementStaffId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderManagementStaffId1",
                table: "Orders");
        }
    }
}
