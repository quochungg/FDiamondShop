using FDiamondShop.API.Helper;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IMomoRepository
    {
        public  Task <Object> CreateMomoPaymentAsync(PaymentInformationModel model);
        public  MomoExecuteResponseModel PaymentExecute(IQueryCollection collection);

    }
}
