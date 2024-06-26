using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{

    public class DiscountCodeCreateDTO
    {

        [Required]
        public string DiscountCodeName { get; set; }
        public int DiscountPercent { get; set; } = 0;
        public DateTime? StartingDate { get; set; }
        public DateTime? EndDate { get; set; } 
    }
}
