using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IEmailRepository
    {
        Task SendEmailAsync(MailRequestDTO mailRequest);
        public Task SendEmailOrderAsync(string emailTo);
        public Task SendEmailCancelAsync(string mailTo, string lastName);
    }
}
