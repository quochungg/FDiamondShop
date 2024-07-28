using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;

namespace FDiamondShop.API.Repository
{
    public class WarrantyRepository : Repository<Warranty>, IWarrantyRepository
    {
        private readonly FDiamondContext _db;
        

        public WarrantyRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Warranty> GenerateWarrantyByOrderId(int orderId)
        {
            var order = await _db.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);
            order.CartLines = _db.Orders.SelectMany(o => o.CartLines).Include(cl => cl.CartLineItems).ThenInclude(cli => cli.Product).Where(x => x.OrderId == orderId).ToList();
            Warranty warranty = new Warranty{ 
                Order = order,
                CustomerName = order.User.LastName + " " + order.User.FirstName,
                OrderDate = order.OrderDate,
                OrderId = order.OrderId,
                ExpiryDate = order.OrderDate.AddYears(5)
            };
            _db.Warranties.Add(warranty);
            await _db.SaveChangesAsync();
            return warranty;
        }

        public async Task GenerateWarrantyPDF(int id)
        {
            var listProduct = _db.CartLineItems.Where(x => x.CartLine.OrderId == id).Select(x => x.Product).ToList();
            var warranty = await _db.Warranties.FirstOrDefaultAsync(w => w.OrderId == id);
            GeneratePDF(listProduct, warranty);
        }

        public void GeneratePDF(List<Product> products, Warranty warranty)
        {
            QuestPDF.Settings.License = LicenseType.Community;
            Document.Create(container =>
            {
                foreach (var product in products)
                {

                    container
                   .Page(page =>
                   {
                       page.Size(PageSizes.A4);
                       page.Margin(20);
                       page.PageColor(Colors.White);
                       page.DefaultTextStyle(x => x.FontSize(20));
                       page.DefaultTextStyle(x => x.FontFamily(Fonts.Candara));
                       page.Header().Element(container =>
                       {
                           container.PaddingVertical(15).Text("Warranty Certificate").ExtraBold().FontSize(40).FontColor("#000035").AlignCenter().FontFamily(Fonts.TimesNewRoman);
                       });
                       page.Content().PaddingTop(20).Column(column =>
                       {
                           column.Spacing(12);

                           column.Item().Text(text =>
                           {
                               text.Span("Customer Name: ").FontSize(16).FontFamily(Fonts.TimesNewRoman);
                               text.Span($"{warranty.CustomerName}").FontSize(16).ExtraBold();

                           });
                           column.Item().Text(text =>
                           {
                               text.Span("Product No: ").FontSize(16).FontFamily(Fonts.TimesNewRoman);
                               text.Span($"{product.ProductId}").FontSize(16).ExtraBold();
                           });
                           column.Item().Text(text =>
                           {
                               text.Span("Product Name: ").FontSize(16).FontFamily(Fonts.TimesNewRoman);
                               text.Span($"{product.ProductName}").FontSize(16).ExtraBold();

                           });
                           column.Item().Text(text =>
                           {
                               text.Span("Order No: ").FontSize(16).FontFamily(Fonts.TimesNewRoman);
                               text.Span($"{warranty.OrderId}").FontSize(16).ExtraBold();

                           });
                           column.Item().Text(text =>
                           {
                               text.Span("Warranty Date: ").FontSize(16).FontFamily(Fonts.TimesNewRoman);
                               text.Span($"{warranty.OrderDate.ToString("dd/mm/yyyy")} - {warranty.ExpiryDate?.ToString("dd/mm/yyyy")}").FontSize(16).ExtraBold();
                           });
                           column.Item().MaxHeight(200).AlignCenter().PaddingVertical(40).Image("D:\\Code\\csharp\\FDiamondShop\\BE\\FDiamondShopWebApp\\Images\\warrantylabel.png").FitArea();
                           column.Item().PaddingVertical(10).Row(row =>
                           {
                               row.Spacing(20);
                               row.RelativeItem().PaddingRight(40).Column(col =>
                               {
                                   col.Spacing(10);
                                   col.Item().Text("Director's Signature").FontSize(14).AlignCenter().SemiBold();
                                   col.Item().AlignCenter().MaxWidth(120).MaxHeight(90).Image("D:\\Code\\csharp\\FDiamondShop\\BE\\FDiamondShopWebApp\\Images\\signature.jpg").FitWidth().FitHeight();
                                   col.Item().Text("Nguyen Huu Quoc Hung").FontSize(14).AlignCenter();
                               });
                               row.RelativeItem().PaddingLeft(40).Column(col =>
                               {

                                   col.Spacing(10);
                                   col.Item().Text("Company").FontSize(14).AlignCenter().SemiBold();
                                   col.Item().AlignCenter().MaxWidth(90).MaxHeight(90).Image("D:\\Code\\csharp\\FDiamondShop\\BE\\FDiamondShopWebApp\\Images\\logo.png").FitWidth().FitHeight();
                                   col.Item().Text("FDIAMOND").FontSize(14).AlignCenter();
                               });
                           });

                       });


                       page.Footer().Column(column =>
                       {
                           column.Spacing(16);
                           column.Item().Text("FDiamond Shop Warranty Policy").FontSize(13).AlignCenter().Bold();
                           column.Item().Row(row =>
                           {
                               row.Spacing(13);

                               row.RelativeItem().Text("Coverage:\r\n- Our warranty covers manufacturing defects, including loose or lost diamonds and prong repair/tightening.").FontSize(11).AlignLeft();

                               row.RelativeItem().Text("Conditions:\r\n- Proof of purchase is required.\r\n- The item must be undamaged by misuse, abuse, or unauthorized alterations.").FontSize(11).AlignLeft();

                               row.RelativeItem().Text("Exclusions:\r\n- Normal wear, accidental damage, and loss/theft.\r\n- Alterations by unauthorized persons.").FontSize(11).AlignLeft();

                           });
                           column.Item().Text("FDIAMOND").FontSize(10).AlignCenter().Bold();
                           column.Item().Row(row =>
                           {
                               row.Spacing(10);
                               row.RelativeItem().Text("Address: District 9, Ho Chi Minh City").FontSize(10).AlignLeft();
                               row.RelativeItem().Text("Hotline: 1800-54-54-57").FontSize(10).AlignRight();
                           });

                       });
                       page.Margin(20);


                   });

                }

            }).GenerateImages();
        }

    }
}
