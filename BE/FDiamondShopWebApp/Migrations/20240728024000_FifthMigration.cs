using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FDiamondShop.API.Migrations
{
    /// <inheritdoc />
    public partial class FifthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Warranty_Orders_OrderId",
                table: "Warranty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Warranty",
                table: "Warranty");

            migrationBuilder.RenameTable(
                name: "Warranty",
                newName: "Warranties");

            migrationBuilder.RenameIndex(
                name: "IX_Warranty_OrderId",
                table: "Warranties",
                newName: "IX_Warranties_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warranties",
                table: "Warranties",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Warranties_Orders_OrderId",
                table: "Warranties",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "order_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Warranties_Orders_OrderId",
                table: "Warranties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Warranties",
                table: "Warranties");

            migrationBuilder.RenameTable(
                name: "Warranties",
                newName: "Warranty");

            migrationBuilder.RenameIndex(
                name: "IX_Warranties_OrderId",
                table: "Warranty",
                newName: "IX_Warranty_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warranty",
                table: "Warranty",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Warranty_Orders_OrderId",
                table: "Warranty",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "order_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
