using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class SubCategory
{
    public int SubCategoryId { get; set; }

    public int? CategoryId { get; set; }

    public string SubcategoryName { get; set; }

    public string Description { get; set; }

    public string ImageUrl { get; set; }

    public virtual Category Category { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
