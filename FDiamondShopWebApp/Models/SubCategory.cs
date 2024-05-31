using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class SubCategory
{
    public int SubCategoryId { get; set; }

    public int? CategoryId { get; set; }

    public string SubcategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public string ImageUrl { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
