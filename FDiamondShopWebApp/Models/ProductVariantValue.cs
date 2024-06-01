using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class ProductVariantValue
{
    public int VariantId { get; set; }

    public int ProductId { get; set; }

    public string Value { get; set; }

    public virtual Product Product { get; set; }

    public virtual CategoryVariant Variant { get; set; }
}
