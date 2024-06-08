using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly FDiamondContext _db;
        public ProductRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IQueryable<Product>> GetProductByFilterAsync(FilterDiamondDTO filterDiamondDTO, IQueryable<Product> products) {
            var colorId = 1;
            var clarityId = 2; 
            var cutId = 3;
            var caratWeightId = 4;
            var fluorescenceId = 5;
            var lengthId = 6;
            var depthId = 7;
            products = products.Where(p => filterDiamondDTO.Color.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == colorId).Value));
            products = products.Where(p => filterDiamondDTO.Clarity.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == clarityId).Value));
            products = products.Where(p => filterDiamondDTO.Cut.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == cutId).Value));
            products = products.Where(p => filterDiamondDTO.CaratWeight.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == caratWeightId).Value));
            products = products.Where(p => filterDiamondDTO.Fluorescene.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == fluorescenceId).Value));
            products = products.Where(p => filterDiamondDTO.Length.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == lengthId).Value));
            products = products.Where(p => filterDiamondDTO.Depth.Contains(p.ProductVariantValues.FirstOrDefault(v => v.VariantId == depthId).Value));
            return await Task.FromResult(products);

        }

        public async Task<IEnumerable<Product>> SearchProductByName(string searchValue)
        {
            return await _db.Products.Include(p => p.ProductImages).
                Include(p => p.ProductVariantValues).
                Include(p => p.SubCategory).
                ThenInclude(o => o.Category).
                Where(p => p.ProductName.Contains(searchValue)).
                ToListAsync();
        }

        public async Task<Product> UpdateProduct(ProductUpdateDTO dto)
        {
            var product = await _db.Products.Include(p => p.ProductVariantValues).Include(p => p.ProductImages).FirstOrDefaultAsync(u => u.ProductId == dto.ProductId) ?? throw new Exception("Product Not Found!");
            return product ?? new Product();
        }
    }
}
