using FDiamondShop.API.Helper;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IVnPayRepository
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);

        PaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}
