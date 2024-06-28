using FDiamondShop.API.Helper;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IPayPalRepository
    {
        public Task <string> CreatePaymentUrl(PaymentInformationModel model);
        public PayPalResponseModel PaymentExecute(IQueryCollection collections);
    }
}
