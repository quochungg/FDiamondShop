using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace FDiamondShop.API.Models
{

    public partial class DiscountCode
    {     
        public int DiscountId { get; set; }

        public string DiscountCodeName { get; set; }

        public int DiscountPercent { get; set; } = 0;

        public DateTime? StartingDate { get; set; } 

        public DateTime? EndDate { get; set; }

        public bool IsExpried { get; set; }
        
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
