namespace FDiamondShop.API.Repository.IRepository
{
    public interface IExchangeRepository
    {
        Task<decimal> ExchangeMoneyToVND(decimal amount, string toCurrency);
    }
}
