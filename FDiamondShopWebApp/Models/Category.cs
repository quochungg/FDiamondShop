using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public string ImageUrl { get; set; } = null!;

    public virtual ICollection<CategoryVariant> CategoryVariants { get; set; } = new List<CategoryVariant>();

    public virtual ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
}
