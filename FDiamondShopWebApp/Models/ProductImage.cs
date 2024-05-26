using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FDiamondShop.API.Models;

public partial class ProductImage
{
    public int ProductImageId { get; set; }

    public int? ProductId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool IsGia { get; set; } = false;

    public virtual Product Product { get; set; } = null!;
}
