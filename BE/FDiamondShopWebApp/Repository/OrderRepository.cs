using Azure;
using FDiamondShop.API.Data;

using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

using FDiamondShop.API.Models.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;


namespace FDiamondShop.API.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private readonly FDiamondContext _db;
        private readonly IMapper _mapper;
        public OrderRepository(FDiamondContext db, IMapper mapper) : base(db)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task RemoveOrderAsync(Order order)
        {
            _db.Remove(order);
        }
        public async Task UpdateOrderAsync(Order order)
        {
            _db.Orders.Update(order);
        }
        public async Task<List<OrderDTO>> GetAllOrderAsync(string userId)
        {
            var Orders = await _db.Orders.Where(x=>x.UserId==userId).ToListAsync();

            if(Orders.Count == 0)
            {
                return null;
            }
            
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (var model in Orders)
            {
                var orderDTO = await GetOrderDetails(model.OrderId);
                orderDTOs.Add(orderDTO);
            }
            return orderDTOs;
        }

        public async Task<OrderDTO> GetOrderDetails(int orderId)
        {
            var order = await _db.Orders.Include(o => o.CartLines).ThenInclude(c => c.CartLineItems).ThenInclude(cli => cli.Product).Include(o => o.DiscountCode).FirstOrDefaultAsync(x => x.OrderId == orderId);

            if (order == null)
            {
                return null;
            }

            var cartlineDTOs= new List<CartLineDTO>();
            var cartlines = order.CartLines.ToList();
            foreach(var cartline in cartlines)
            {
                var cartlineDTO = _mapper.Map<CartLineDTO>(cartline);
                cartlineDTO.CartLineItems = new List<CartLineItemDTO>();
                var cartlineItems = cartline.CartLineItems.Where(x => x.CartLineId == cartline.CartLineId).ToList();
                foreach (var cartlineItem in cartlineItems)
                {
                    var cartlineItemDTO = _mapper.Map<CartLineItemDTO>(cartlineItem);
                    cartlineItemDTO.Product = _mapper.Map<ProductDTO>(cartlineItem.Product);
                    cartlineDTO.CartLineItems.Add(cartlineItemDTO);
                }
                cartlineDTOs.Add(cartlineDTO);
            }
            var payment = _db.Payments.FirstOrDefault(x => x.PaymentId == order.PaymentId);
            var paymentDTO = _mapper.Map<PaymentDTO>(payment);
            var discountCode = _mapper.Map<DiscountCodeDTO>(order.DiscountCode);
            OrderDTO model = new OrderDTO()
            {
                OrderId = order.OrderId,               
                OrderDate = order.OrderDate,
                PaymentInfo = paymentDTO,
                BasePrice = order.BasePrice,
                TotalPrice = order.TotalPrice,
                DiscountCodeId = order.DiscountCodeId,
                Status = order.Status,
                CartLines = cartlineDTOs,
                DiscountCode = discountCode
            };
             
            
            return model;
        }

        public async Task CancelOrder(int orderId)
        {
            var order = await _db.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);
            var cartlines = await _db.CartLines.Where(x => x.OrderId == orderId).ToListAsync();
            foreach (var cartline in cartlines)
            {
                cartline.IsOrdered = false;
                foreach (var cartlineItem in cartline.CartLineItems)
                {
                    var product = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == cartlineItem.ProductId);
                    product.Quantity += 1;
                    product.IsVisible = true;
                    _db.Products.Update(product);
                }
            }

            order.Status = "Cancelled";
            _db.Orders.Update(order);
        }

        
    }

}
