using AutoMapper;
using Azure;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net;

namespace FDiamondShop.API.Repository
{
    public class EmailRepository : IEmailRepository
    {
        private readonly EmailSetting _emailSetting;
        private readonly FDiamondContext _db;
        private readonly IMapper _mapper;
        public EmailRepository(IOptions<EmailSetting> options, FDiamondContext db, IMapper mapper)
        {
            this._emailSetting = options.Value;
            _db = db;
            _mapper = mapper;
        }
        public async Task SendEmailAsync(MailRequestDTO mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailSetting.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.toEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(_emailSetting.Host, _emailSetting.Port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSetting.Mail, _emailSetting.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);

        }

        public async Task SendEmailCancelAsync(string mailTo, string lastName)
        {
            await SendEmailAsync(new MailRequestDTO
            {
                Body = $@"<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;k
        }}
        .container {{
            max-width: 600px;
            margin: 20px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            color: #333;
            text-align: center;
        }}
        p {{
            color: #666;
            text-align: center;
        }}
        .header-image {{
            width: 100px;
            height: auto;
            margin: 20px auto;
            display: block;
        }}
    </style>
</head>
<body>
    <div class='container'>
        <h1>Dear {lastName},</h1>
        <p>We regret to inform you that your recent order with FDIAMOND has been successfully cancelled as per your request.</p>
        <p>We apologize for any inconvenience this may have caused.</p>
        <p>If you have any questions or need further assistance, please feel free to contact us via email or our support phone number.</p>
        <p>Thank you for understanding. We hope to serve you again in the future. Have a wonderful day!</p>
        <br/>
        <p>Sincerely,</p>
        <p>The FDIAMOND Team</p>
    </div>
</body>
</html>",
                Subject = "Your Order has been Cancelled",
                toEmail = mailTo
            });
        }

        public async Task SendEmailOrderAsync(string emailTo, OrderDTO orderDTO, PaymentDTO paymentDTO)
        {
            var discount = await _db.DiscountCodes.FindAsync(orderDTO.DiscountCodeId);

            var order = await _db.Orders.FindAsync(orderDTO.OrderId);
            var payment = await _db.Payments.FindAsync(order.PaymentId);
            var orderDetail = new List<ProductDTO>();
            foreach (var item in orderDTO.CartLines)
            {
                var cartLine = await _db.CartLines.FindAsync(item.CartLineId);
                var cartLineItems = await _db.CartLineItems.Where(cli => cli.CartLineId == item.CartLineId).ToListAsync();
                foreach (var cartLineItem in cartLineItems)
                {
                    var product = await _db.Products.FindAsync(cartLineItem.ProductId);
                    var subcategory = await _db.SubCategories.FindAsync(product.SubCategoryId);
                    var category = await _db.Categories.FindAsync(subcategory.CategoryId);
                    var images = await _db.ProductImages.Where(pi => pi.ProductId == product.ProductId).ToListAsync();
                    var imagesDTO = _mapper.Map<List<ProductImageDTO>>(images);
                    var productDTO = new ProductDTO
                    {
                        ProductName = product.ProductName,
                        BasePrice = product.BasePrice,
                        CategoryName = category.CategoryName,
                        ProductImages = imagesDTO
                    };
                    orderDetail.Add(productDTO);
                }
            }

            string subject = "Thank You for Shopping at FDIAMOND!";
            string body = $@"
<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }}
        .container {{
            max-width: 600px;
            margin: 20px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            color: #333;
        }}
        p {{
            color: #666;
        }}
        ul {{
            list-style-type: none;
            padding: 0;
        }}
        li {{
            display: flex;
            background: #f9f9f9;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }}
        .product-image {{
            width: 135px;              
            height: auto;
            margin-right: 20px;
            flex-shrink: 0;
        }}
        .product-details {{
            flex: 1;
            
            flex-direction: column;
        }}
        .order-summary {{
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }}
    </style>
</head>
<body>
    <div class='container'>
        <h1>Dear Valued Customer!</h1>
        <p>We sincerely thank you for trusting and shopping at FDIAMOND.</p>
        <p>Your order has been successfully processed.</p>
        <p>Here are the details of your order:</p>
        <p>Order Date: {orderDTO.OrderDate}</p>
        <p>Order Transaction ID: {paymentDTO.TransactionId}</p>
        <p>";
            if (order.DiscountCodeId != null)
            {
                body +=
        $@"<p>Discount Code: {discount.DiscountCodeName}</p>";
            }
            body += $@"
            </p>
        <p>Order Items:</p>
        <ul>";
            foreach (var product in orderDetail)
            {
                body += $@"
        <li>
            <img src='{product.ProductImages.First().ImageUrl}' alt='{product.ProductName} Image' class='product-image' />
            <div class='product-details'>
                <p><strong>Product Name:</strong> {product.ProductName}</p>
                <p><strong>Base Price:</strong> {product.BasePrice}</p>
                <p><strong>Category:</strong> {product.CategoryName}</p>
            </div>
        </li>";
            }
            body += $@"
        </ul>
        <div class='order-summary'>
            <p><strong>Order Status:</strong> {orderDTO.Status}</p>
            <p><strong>Order Base Price:</strong> {orderDTO.BasePrice}</p>
            <p><strong>Order Total Price:</strong> {orderDTO.TotalPrice}</p>
            <p><strong>Payment Method:</strong> {payment.PaymentMethod}</p>
        </div>
        <p>If you have any questions, please feel free to contact us via email or our support phone number.</p>
        <p>Once again, thank you for choosing FDIAMOND. Have a wonderful day!</p>
        <br/>
        <p>Sincerely,</p>
        <p>The FDIAMOND Team</p>
    </div>
</body>
</html>";

            MailRequestDTO mailRequestDTO = new()
            {
                Body = body,
                Subject = subject,
                toEmail = emailTo
            };

            await SendEmailAsync(mailRequestDTO);
        }
    }
}
