﻿namespace FDiamondShop.API.Models.DTO
{
    public class OrderDTO
    {
        
        public int OrderId { get; set; }

        public PaymentDTO? PaymentInfo { get; set; }

        public decimal BasePrice { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime OrderDate { get; set; }

        public int? DiscountCodeId { get; set; }

        public DiscountCodeDTO? DiscountCode { get; set; }

        public virtual List<CartLineDTO> CartLines { get; set; } = new List<CartLineDTO>();

        public string Status { get; set; }

        public DateTime? UpdateDate { get; set; }

        public int? DeliveryDetailId { get; set; }
        
        public DeliveryDTO? DeliveryDetail { get; set; }
    }
}
