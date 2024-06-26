﻿namespace FDiamondShop.API.Models.DTO
{
    public class DashboardProductDTO
    {
        public int CompletedOrder { get; set; } //(1)

        public int TotalSoldProduct { get; set; } //(2)

        public int DiscountUsed { get; set; } //(3)

        public decimal TotalIncome { get; set; } //(4)

        public decimal AverageIncome { get; set; } //(5) = (4) / (1)
        
        public decimal Discount { get; set; } //(6)

        public decimal ActualIncome { get; set; } //(7) = (4) - (6)
        

    }
}
