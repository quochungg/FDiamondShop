using FDiamondShop.API.Helper;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IMomoRepository
    {
        Task <Object> CreateMomoPaymentAsync(PaymentInformationModel model);

    }
}
