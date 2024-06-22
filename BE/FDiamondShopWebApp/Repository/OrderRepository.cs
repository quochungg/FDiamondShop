using Azure;
using FDiamondShop.API.Data;
using FDiamondShop.API.Helper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using System.Net.Http;
using System.Net;
using FDiamondShop.API.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FDiamondShop.API.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private readonly FDiamondContext _db;     
        public OrderRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async Task RemoveOrderAsync(Order order)
        {
            _db.Remove(order);
        }
        public async Task UpdateOrderAsync(Order order)
        {
            _db.Update(order);
        }
        public async Task<List<OrderDTO>> GetAllOrderAsync()
        {
            var Orders = _db.Orders.ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (var order in Orders)
            {
                OrderDTO orderDTO = new OrderDTO()
                {
                    
                    BasePrice = order.BasePrice,
                    OrderDate = order.OrderDate,
                    DiscountCodeId = order.DiscountCodeId,
                    TotalPrice = order.TotalPrice,
                    PaymentId = order.PaymentId,

                };
                orderDTOs.Add(orderDTO);
            }
            return orderDTOs;
        }
       
    }

}
