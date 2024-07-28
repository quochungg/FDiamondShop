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
            var Orders = await _db.Orders.Where(x => x.UserId == userId).ToListAsync();

            if (Orders.Count == 0)
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
            //var order = await _db.Orders.Include(o => o.CartLines).ThenInclude(c => c.CartLineItems).ThenInclude(cli => cli.Product).ThenInclude(p => p.SubCategory).ThenInclude(p => p.Category).Include(o => o.DiscountCode).FirstOrDefaultAsync(x => x.OrderId == orderId);
            var order = await _db.Orders
                    .Include(o => o.CartLines)
                        .ThenInclude(c => c.CartLineItems)
                            .ThenInclude(cli => cli.Product)                               
                                .ThenInclude(p => p.SubCategory)
                                    .ThenInclude(sc => sc.Category)
                                    .Include(o => o.DeliveryDetail)
                                //.ThenInclude(p => p.ProductImages) // Include ProductImages
                    .Include(o => o.DiscountCode)
                    .FirstOrDefaultAsync(x => x.OrderId == orderId);


            if (order == null)
            {
                return null;
            }

            var cartlineDTOs = new List<CartLineDTO>();
            var cartlines = order.CartLines.ToList();
            foreach (var cartline in cartlines)
            {
                var cartlineDTO = _mapper.Map<CartLineDTO>(cartline);
                cartlineDTO.CartLineItems = new List<CartLineItemDTO>();
                var cartlineItems = cartline.CartLineItems.Where(x => x.CartLineId == cartline.CartLineId).ToList();
                foreach (var cartlineItem in cartlineItems)
                {
                    var cartlineItemDTO = _mapper.Map<CartLineItemDTO>(cartlineItem);
                    cartlineItemDTO.Product = _mapper.Map<ProductDTO>(cartlineItem.Product);
                    cartlineDTO.CartLineItems.Add(cartlineItemDTO);
                    cartlineItemDTO.Product.ProductImages = _mapper.Map<List<ProductImageDTO>>(_db.ProductImages.Where(o => o.ProductId == cartlineItem.ProductId).ToList());
                    cartlineItemDTO.Product.CategoryName = cartlineItem.Product.SubCategory.Category.CategoryName;
                }
                cartlineDTOs.Add(cartlineDTO);
            }
            var payment = _db.Payments.FirstOrDefault(x => x.PaymentId == order.PaymentId);
            var paymentDTO = _mapper.Map<PaymentDTO>(payment);
            var discountCode = _mapper.Map<DiscountCodeDTO>(order.DiscountCode);
            var deliveryDetail = _mapper.Map<DeliveryDTO>(order.DeliveryDetail);
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
                DiscountCode = discountCode,
                UpdateDate = order.UpdateDate,
                DeliveryDetail = deliveryDetail
            };


            return model;
        }

        public async Task CancelOrder(int orderId)
        {
            var order = await _db.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);
            var cartlines = await _db.CartLines.Where(x => x.OrderId == orderId).ToListAsync();
            var warranty = await _db.Warranties.FirstOrDefaultAsync(x => x.OrderId == orderId);
            _db.Warranties.Remove(warranty);
            foreach (var cartline in cartlines)
            {
                foreach (var cartlineItem in cartline.CartLineItems)
                {
                    var product = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == cartlineItem.ProductId);
                    product.Quantity += 1;
                    product.IsVisible = true;
                    _db.Products.Update(product);
                }
            }
            order.Status = "Cancelled";
            order.UpdateDate = DateTime.Now;
            _db.Orders.Update(order);
        }
        public async Task RollBackOrder(int orderId)
        {
            var order = await _db.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);
            var cartlines = await _db.CartLines.Where(x => x.OrderId == orderId).ToListAsync();
            
            foreach (var cartline in cartlines)
            {
                var cartlineItem = await _db.CartLineItems.Where(x => x.CartLineId == cartline.CartLineId).ToListAsync();
                foreach (var item in cartlineItem)
                {
                    var product = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == item.ProductId);
                    product.Quantity += 1;
                    product.IsVisible = true;
                    _db.Products.Update(product);
                }
            }
            order.Status = "Failed";
            order.UpdateDate = DateTime.Now;
            _db.Orders.Update(order);
        }

        public async Task<List<OrderDTO>> FilterOrder(string userId, string? status, string? orderBy)
        {
            var orders = await _db.Orders.Where(x => x.UserId == userId).ToListAsync();

            if (status != null)
            {
                orders = orders.Where(x => x.Status == status).ToList();
            }
            orders = orders.OrderByDescending(x => x.OrderDate).ToList();
            var result = new List<OrderDTO>();
            foreach (var order in orders)
            {
                result.Add(await GetOrderDetails(order.OrderId));
            }
            return result;
        }

        public async Task CompleteOrder(int orderId)
        {
            var order = await _db.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);
            var detail =  _db.DeliveryDetails.FirstOrDefault(dt => dt.DeliveryDetailId == order.DeliveryDetailId);
            if (order == null && detail == null)
            {
                throw new Exception("Not found Order");
            }
            order.Status = "Delivered";
            order.UpdateDate = DateTime.Now;
            detail.ReceiveDate = DateTime.Now;
            return;
        }
        public async Task RePurchase(int orderid)
        {
            var order = _db.Orders.FirstOrDefault(x => x.OrderId == orderid);
            if (order == null)
            {
                throw new Exception("Not found");
            }
            _db.Orders.Remove(order);
            var cartlines = await _db.CartLines.Where(x => x.OrderId == orderid).ToListAsync();
            foreach (var line in cartlines)
            {
                line.IsOrdered = false;
            }

        }

        public async Task<IEnumerable<Order>> GetPendingOrdersOlderThan(DateTime cutoffTimeVietnam)
        {
            TimeZoneInfo vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

            // Convert Vietnamese time to UTC for database comparison
            DateTime cutoffTimeUtc = TimeZoneInfo.ConvertTimeToUtc(cutoffTimeVietnam, vietnamTimeZone);
            return await _db.Orders.Where(x => x.OrderDate < cutoffTimeVietnam && x.Status == "Pending").ToListAsync();
        }
        public  Order GetOrderbyId(int id)
        {
            return _db.Orders.FirstOrDefault(or => or.OrderId == id);
        }
        public async Task<List<OrderDTO>> GetAllOrderForOrderManagement(string id)
        {
            var order = _db.Orders.Where(x => x.OrderManagementStaffId == id).ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (var item in order)
            {
                var orderDTO = await GetOrderDetails(item.OrderId);
                if (orderDTO.Status == "Ordered")
                {
                    return orderDTOs;
                }
                else
                {
                    orderDTOs.Add(orderDTO);
                }

            }
            return orderDTOs;
        }
        public async Task<List<OrderDTO>> GetAllOrderForDelivery(string id)
        {
            var order = _db.Orders.Include(o => o.DeliveryDetail).Where(x => x.DeliveryDetail.UserId == id).ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (var item in order)
            {
                var orderDTO = await GetOrderDetails(item.OrderId);
                if (orderDTO.Status == "Preparing")
                {
                    return orderDTOs;
                }
                else
                {
                    orderDTOs.Add(orderDTO);
                }
            }
            return orderDTOs;
        }
        public Task UpdateAsync(Order order)
        {
            throw new NotImplementedException();
        }
    }

}
