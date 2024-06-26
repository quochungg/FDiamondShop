﻿using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IProductImageRepository : IRepository<ProductImage>
    {
        public void UpdateProductImageAsync(Product product, List<ProductImage> productUpdate);

    }
}
