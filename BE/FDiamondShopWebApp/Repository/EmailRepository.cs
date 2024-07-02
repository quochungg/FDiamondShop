using Azure;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net;

namespace FDiamondShop.API.Repository
{
    public class EmailRepository : IEmailRepository
    {
        private readonly EmailSetting _emailSetting;

        public EmailRepository(IOptions<EmailSetting> options)
        {
            this._emailSetting = options.Value;
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
                <body>
                    <h1>Dear{lastName},</h1>
                    <p>We regret to inform you that your recent order with FDIAMOND has been successfully cancelled as per your request.</p>
                    <p>We apologize for any inconvenience this may have caused.</p>
                    <p>If you have any questions or need further assistance, please feel free to contact us via email or our support phone number.</p>
                    <p>Thank you for understanding. We hope to serve you again in the future. Have a wonderful day!</p>
                    <br/>
                    <p>Sincerely,</p>
                    <p>The FDIAMOND Team</p>
                </body>
                </html>
                ",
                Subject = "Your Order has been Cancelled",
                toEmail = mailTo
            });
        }

        public async Task SendEmailOrderAsync(string emailTo)
        {
            string subject = "Thank You for Shopping at FDIAMOND!";
            string body = @"
                <html>
                <body>
                    <h1>Dear Valued Customer!</h1>
                    <p>We sincerely thank you for trusting and shopping at FDIAMOND.</p>
                    <p>Your order has been successfully processed.</p>
                    <p>If you have any questions, please feel free to contact us via email or our support phone number.</p>
                    <p>Once again, thank you for choosing FDIAMOND. Have a wonderful day!</p>
                    <br/>
                    <p>Sincerely,</p>
                    <p>The FDIAMOND Team</p>
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
