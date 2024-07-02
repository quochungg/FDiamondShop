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
                model.CartLines = await _db.CartLines.Where(cl => cl.OrderId == model.OrderId).ToListAsync();
                var payment = await _db.Payments.FirstOrDefaultAsync(x => x.PaymentId == model.PaymentId);
                var paymentDTO = _mapper.Map<PaymentDTO>(payment);
                OrderDTO orderDTO = new OrderDTO()
                {
                    OrderId= model.OrderId,
                    BasePrice = model.BasePrice,
                    OrderDate = model.OrderDate,
                    DiscountCodeId = model.DiscountCodeId,
                    TotalPrice = model.TotalPrice,
                    PaymentInfo = paymentDTO,
                    CartLines = _mapper.Map<List<CartLineDTO>>(model.CartLines)
                };
                foreach(var item in orderDTO.CartLines)
                {
                    item.CartLineItems = _mapper.Map<List<CartLineItemDTO>>(_db.CartLineItems.Where(cli => cli.CartLineId == item.CartLineId).ToList());
                }
                orderDTOs.Add(orderDTO);
            }
            return orderDTOs;
        }

        public async Task<OrderDTO> GetOrderDetails(int orderId)
        {
            var order = await _db.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);

            if (order == null)
            {
                return null;
            }

            var cartlineDTOs= new List<CartLineDTO>();
            var cartlines = _db.CartLines.Where(x => x.OrderId == orderId).ToList();
            foreach(var cartline in cartlines)
            {
                var cartlineDTO = _mapper.Map<CartLineDTO>(cartline);
                cartlineDTO.CartLineItems = new List<CartLineItemDTO>();
                var cartlineItems = _db.CartLineItems.Where(x => x.CartLineId == cartline.CartLineId).ToList();
                foreach (var cartlineItem in cartlineItems)
                {
                    var cartlineItemDTO = _mapper.Map<CartLineItemDTO>(cartlineItem);
                    cartlineDTO.CartLineItems.Add(cartlineItemDTO);
                }
                cartlineDTOs.Add(cartlineDTO);
            }
            var payment = _db.Payments.FirstOrDefault(x => x.PaymentId == order.PaymentId);
            var paymentDTO = _mapper.Map<PaymentDTO>(payment);
            OrderDTO model = new OrderDTO()
            {
                OrderId = order.OrderId,
                
                OrderDate = order.OrderDate,
                PaymentInfo = paymentDTO,
                BasePrice = order.BasePrice,
                TotalPrice = order.TotalPrice,
                DiscountCodeId = order.DiscountCodeId,
                CartLines = cartlineDTOs
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
