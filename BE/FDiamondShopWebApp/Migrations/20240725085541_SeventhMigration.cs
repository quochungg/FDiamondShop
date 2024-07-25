using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FDiamondShop.API.Migrations
{
    /// <inheritdoc />
    public partial class SeventhMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryDetailId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryDetailId",
                table: "Orders",
                column: "DeliveryDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryDetails_DeliveryDetailId",
                table: "Orders",
                column: "DeliveryDetailId",
                principalTable: "DeliveryDetails",
                principalColumn: "DeliveryDetailId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryDetails_DeliveryDetailId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DeliveryDetailId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryDetailId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "address",
                table: "Orders");
        }
    }
}
