using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IWarrantyRepository : IRepository<Warranty>
    {
        public Task<Warranty> GenerateWarrantyByOrderId(int orderId);
        public void GenerateWarrantyPDF(Warranty warranty);
        public void GeneratePDF(List<Product> products, Warranty warranty);
    }
}
