using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FDiamondShop.API.Migrations
{
    /// <inheritdoc />
    public partial class SixMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDetail_AspNetUsers_UserId",
                table: "DeliveryDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryDetail_DeliveryDetailDeliveryId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DeliveryDetailDeliveryId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryDetailDeliveryId",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "DeliveryDetail",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryId",
                table: "Orders",
                column: "DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDetail_AspNetUsers_UserId",
                table: "DeliveryDetail",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryDetail_DeliveryId",
                table: "Orders",
                column: "DeliveryId",
                principalTable: "DeliveryDetail",
                principalColumn: "DeliveryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDetail_AspNetUsers_UserId",
                table: "DeliveryDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryDetail_DeliveryId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DeliveryId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "DeliveryDetailDeliveryId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "DeliveryDetail",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryDetailDeliveryId",
                table: "Orders",
                column: "DeliveryDetailDeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDetail_AspNetUsers_UserId",
                table: "DeliveryDetail",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryDetail_DeliveryDetailDeliveryId",
                table: "Orders",
                column: "DeliveryDetailDeliveryId",
                principalTable: "DeliveryDetail",
                principalColumn: "DeliveryId");
        }
    }
}
