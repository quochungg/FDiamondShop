using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FDiamondShop.API.Models
{
    public class DeliveryDetail
    {
        public int DeliveryDetailId { get; set; }
        public string? UserId { get; set; } = null;
        public virtual ApplicationUser? User { get; set; } = null;

        public string Address { get; set; }
        public string Phone { get; set; }
        public string? Note { get; set; } = string.Empty;
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string? FailReason { get; set; } = string.Empty;
        public DateTime? ReceiveDate { get; set; }
    }
}
