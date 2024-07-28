using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IWarrantyRepository : IRepository<Warranty>
    {
        public Task<Warranty> GenerateWarrantyByOrderId(int orderId);
        public Task GenerateWarrantyPDF(int orderId);
        public void GeneratePDF(List<Product> products, Warranty warranty);
    }
}
