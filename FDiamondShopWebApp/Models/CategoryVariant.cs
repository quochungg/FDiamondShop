using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class CategoryVariant
{
    public int VariantId { get; set; }

    public int? CategoryId { get; set; }

    public string VariantName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<ProductVariantValue> ProductVariantValues { get; set; } = new List<ProductVariantValue>();
}
