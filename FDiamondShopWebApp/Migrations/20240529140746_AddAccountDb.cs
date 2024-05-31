using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FDiamondShop.API.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__category___categ__29572725",
                table: "category_variants");

            migrationBuilder.DropForeignKey(
                name: "FK__product_i__produ__34C8D9D1",
                table: "product_images");

            migrationBuilder.DropForeignKey(
                name: "FK__product_v__produ__31EC6D26",
                table: "product_variant_values");

            migrationBuilder.DropForeignKey(
                name: "FK__product_v__varia__30F848ED",
                table: "product_variant_values");

            migrationBuilder.DropForeignKey(
                name: "FK__products__sub_ca__2C3393D0",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK__sub_categ__categ__267ABA7A",
                table: "sub_categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK__sub_cate__0A556D5FCA9F6012",
                table: "sub_categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK__products__47027DF5E9F82F0A",
                table: "products");

            migrationBuilder.DropPrimaryKey(
                name: "PK__product___AEBC4F68B5BE01FC",
                table: "product_variant_values");

            migrationBuilder.DropPrimaryKey(
                name: "PK__product___0302EB4ACDDAE1DE",
                table: "product_images");

            migrationBuilder.DropPrimaryKey(
                name: "PK__category__EACC68B77F3D652B",
                table: "category_variants");

            migrationBuilder.DropPrimaryKey(
                name: "PK__categori__D54EE9B41F208242",
                table: "categories");

            migrationBuilder.AlterColumn<bool>(
                name: "is_visible",
                table: "products",
                type: "bit",
                nullable: false,
                defaultValueSql: "((1))",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValueSql: "((1))");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "products",
                type: "bit",
                nullable: false,
                defaultValueSql: "((0))",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValueSql: "((0))");

            migrationBuilder.AddPrimaryKey(
                name: "PK__sub_cate__0A556D5F0EB73593",
                table: "sub_categories",
                column: "sub_category_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__products__47027DF50082A97F",
                table: "products",
                column: "product_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__product___AEBC4F683554C815",
                table: "product_variant_values",
                columns: new[] { "variant_id", "product_id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__product___0302EB4A81F0C8B7",
                table: "product_images",
                column: "product_image_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__category__EACC68B780BFAFCD",
                table: "category_variants",
                column: "variant_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__categori__D54EE9B40910DE00",
                table: "categories",
                column: "category_id");

            migrationBuilder.CreateTable(
                name: "accounts",
                columns: table => new
                {
                    account_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    first_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    last_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    password_hash = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    googleid = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    is_google_account = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((0))"),
                    role = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, defaultValueSql: "('Customer')"),
                    date_create = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__accounts__46A222CD8ABCA3F2", x => x.account_id);
                });

            migrationBuilder.CreateIndex(
                name: "UQ__accounts__AB6E6164A2413C2B",
                table: "accounts",
                column: "email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK__category___categ__33D4B598",
                table: "category_variants",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "category_id");

            migrationBuilder.AddForeignKey(
                name: "FK__product_i__produ__3F466844",
                table: "product_images",
                column: "product_id",
                principalTable: "products",
                principalColumn: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK__product_v__produ__3C69FB99",
                table: "product_variant_values",
                column: "product_id",
                principalTable: "products",
                principalColumn: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK__product_v__varia__3B75D760",
                table: "product_variant_values",
                column: "variant_id",
                principalTable: "category_variants",
                principalColumn: "variant_id");

            migrationBuilder.AddForeignKey(
                name: "FK__products__sub_ca__36B12243",
                table: "products",
                column: "sub_category_id",
                principalTable: "sub_categories",
                principalColumn: "sub_category_id");

            migrationBuilder.AddForeignKey(
                name: "FK__sub_categ__categ__30F848ED",
                table: "sub_categories",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "category_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__category___categ__33D4B598",
                table: "category_variants");

            migrationBuilder.DropForeignKey(
                name: "FK__product_i__produ__3F466844",
                table: "product_images");

            migrationBuilder.DropForeignKey(
                name: "FK__product_v__produ__3C69FB99",
                table: "product_variant_values");

            migrationBuilder.DropForeignKey(
                name: "FK__product_v__varia__3B75D760",
                table: "product_variant_values");

            migrationBuilder.DropForeignKey(
                name: "FK__products__sub_ca__36B12243",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK__sub_categ__categ__30F848ED",
                table: "sub_categories");

            migrationBuilder.DropTable(
                name: "accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK__sub_cate__0A556D5F0EB73593",
                table: "sub_categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK__products__47027DF50082A97F",
                table: "products");

            migrationBuilder.DropPrimaryKey(
                name: "PK__product___AEBC4F683554C815",
                table: "product_variant_values");

            migrationBuilder.DropPrimaryKey(
                name: "PK__product___0302EB4A81F0C8B7",
                table: "product_images");

            migrationBuilder.DropPrimaryKey(
                name: "PK__category__EACC68B780BFAFCD",
                table: "category_variants");

            migrationBuilder.DropPrimaryKey(
                name: "PK__categori__D54EE9B40910DE00",
                table: "categories");

            migrationBuilder.AlterColumn<bool>(
                name: "is_visible",
                table: "products",
                type: "bit",
                nullable: true,
                defaultValueSql: "((1))",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValueSql: "((1))");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "products",
                type: "bit",
                nullable: true,
                defaultValueSql: "((0))",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValueSql: "((0))");

            migrationBuilder.AddPrimaryKey(
                name: "PK__sub_cate__0A556D5FCA9F6012",
                table: "sub_categories",
                column: "sub_category_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__products__47027DF5E9F82F0A",
                table: "products",
                column: "product_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__product___AEBC4F68B5BE01FC",
                table: "product_variant_values",
                columns: new[] { "variant_id", "product_id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__product___0302EB4ACDDAE1DE",
                table: "product_images",
                column: "product_image_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__category__EACC68B77F3D652B",
                table: "category_variants",
                column: "variant_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__categori__D54EE9B41F208242",
                table: "categories",
                column: "category_id");

            migrationBuilder.AddForeignKey(
                name: "FK__category___categ__29572725",
                table: "category_variants",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "category_id");

            migrationBuilder.AddForeignKey(
                name: "FK__product_i__produ__34C8D9D1",
                table: "product_images",
                column: "product_id",
                principalTable: "products",
                principalColumn: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK__product_v__produ__31EC6D26",
                table: "product_variant_values",
                column: "product_id",
                principalTable: "products",
                principalColumn: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK__product_v__varia__30F848ED",
                table: "product_variant_values",
                column: "variant_id",
                principalTable: "category_variants",
                principalColumn: "variant_id");

            migrationBuilder.AddForeignKey(
                name: "FK__products__sub_ca__2C3393D0",
                table: "products",
                column: "sub_category_id",
                principalTable: "sub_categories",
                principalColumn: "sub_category_id");

            migrationBuilder.AddForeignKey(
                name: "FK__sub_categ__categ__267ABA7A",
                table: "sub_categories",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "category_id");
        }
    }
}
