
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FDiamondShop.API.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        
        public string UserId { get; set; }
        
        public virtual ApplicationUser User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
    }
}
