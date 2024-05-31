using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public int? SubCategoryId { get; set; }

    public string ProductName { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal BasePrice { get; set; }

    public string? Description { get; set; }

    public bool IsVisible { get; set; } = true;

    public bool IsDeleted { get; set; } = false;

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<ProductVariantValue> ProductVariantValues { get; set; } = new List<ProductVariantValue>();

    public virtual SubCategory SubCategory { get; set; } = null!;

}
