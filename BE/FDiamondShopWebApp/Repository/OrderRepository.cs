using Azure;
using FDiamondShop.API.Data;

using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

using FDiamondShop.API.Models.DTO;
using AutoMapper;


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
            _db.Update(order);
        }
        public async Task<List<OrderDTO>> GetAllOrderAsync(string userId)
        {
            
            var Orders = _db.Orders.Where(x=>x.UserId==userId).ToList();
            if(Orders.Count == 0)
            {
                return null;
            }
            
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (var model in Orders)
            {
                var payment = _db.Payments.FirstOrDefault(x => x.PaymentId == model.PaymentId);
                var paymentDTO = _mapper.Map<PaymentDTO>(payment);
                OrderDTO orderDTO = new OrderDTO()
                {
                    OrderId= model.OrderId,
                    BasePrice = model.BasePrice,
                    OrderDate = model.OrderDate,
                    DiscountCodeId = model.DiscountCodeId,
                    TotalPrice = model.TotalPrice,
                    PaymentInfo = paymentDTO,

                };
                orderDTOs.Add(orderDTO);
            }
            return orderDTOs;
        }

        public async Task<OrderDTO> GetOrderDetails(int orderId)
        {
            var order = _db.Orders.FirstOrDefault(x=>x.OrderId == orderId);
            if(order == null)
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
    }

}
