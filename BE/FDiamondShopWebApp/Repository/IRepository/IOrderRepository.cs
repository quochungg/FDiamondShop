﻿using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task RemoveOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        public Task<List<OrderDTO>> GetAllOrderAsync(string userId);
        public Task<OrderDTO> GetOrderDetails(int orderId);
    }
}
