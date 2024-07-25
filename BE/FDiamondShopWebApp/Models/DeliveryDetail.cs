using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models
{
    public class DeliveryDetail
    {
        [Key]
        public int DeliveryId { get; set; }
        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime ReceiveDate { get; set; }
    }
}
