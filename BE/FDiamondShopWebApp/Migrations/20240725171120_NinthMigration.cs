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
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "OrderManagementStaffId1",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderManagementStaffId1",
                table: "Orders",
                column: "OrderManagementStaffId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_OrderManagementStaffId1",
                table: "Orders",
                column: "OrderManagementStaffId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_OrderManagementStaffId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderManagementStaffId1",
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
