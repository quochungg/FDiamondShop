using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace FDiamondShop.API.Models
{
    [Index(nameof(DiscountCodeName), IsUnique = true)]

    public partial class DiscountCode
    {
        [Key]
        public int DiscountId { get; set; }
        [Required]
        public string DiscountCodeName { get; set; }
        public int DiscountPercent { get; set; } = 0;
        public DateTime? StartingDate { get; set; } 
        public DateTime? EndDate { get; set; }
        public bool IsExpried { get; set; }
    }
}
