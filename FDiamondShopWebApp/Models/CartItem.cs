using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FDiamondShop.API.Models
{
    public class CartItem
    {
        [Key]
        public int ItemId { get; set; }
        [ForeignKey("ShoppingCart")]
        public int CartId { get; set; }
        public int Quantity { get; set; }
        public System.DateTime CreatedDate { get; set;}
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public virtual ShoppingCart ShoppingCart { get; set; }
         
    }
}
