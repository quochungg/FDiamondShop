using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

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
    }
}
