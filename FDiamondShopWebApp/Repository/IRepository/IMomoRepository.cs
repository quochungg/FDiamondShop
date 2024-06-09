using FDiamondShop.API.Helper;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IMomoRepository
    {
        public  Task <Object> CreateMomoPaymentAsync(PaymentInformationModel model);
        public  Task<MomoExecuteResponseModel> PaymentExecuteAsync(IQueryCollection collection);

    }
}
