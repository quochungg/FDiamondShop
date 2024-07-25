using System;
using FDiamondShop.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Data
{
    public partial class FDiamondContext : IdentityDbContext<ApplicationUser>
    {
        public FDiamondContext()
        {
        }

        public FDiamondContext(DbContextOptions<FDiamondContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoryVariant> CategoryVariants { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<ProductVariantValue> ProductVariantValues { get; set; }
        public virtual DbSet<SubCategory> SubCategories { get; set; }
        public virtual DbSet<DiscountCode> DiscountCodes { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<CartLine> CartLines { get; set; }
        public virtual DbSet<CartLineItem> CartLineItems { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        
        public virtual DbSet<DeliveryDetail> DeliveryDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CategoryId).HasName("PK__categori__D54EE9B40910DE00");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.CategoryName).HasMaxLength(30).HasColumnName("category_name");
                entity.Property(e => e.Description).HasMaxLength(500).HasColumnName("description");
                entity.Property(e => e.ImageUrl).HasMaxLength(255).HasColumnName("image_url");
            });

            modelBuilder.Entity<CategoryVariant>(entity =>
            {
                entity.HasKey(e => e.VariantId).HasName("PK__category__EACC68B780BFAFCD");               
                entity.Property(e => e.VariantId).HasColumnName("variant_id");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.Description).HasMaxLength(255).HasColumnName("description");
                entity.Property(e => e.VariantName).HasMaxLength(30).HasColumnName("variant_name");
                entity.HasOne(d => d.Category).WithMany(p => p.CategoryVariants)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__category___categ__33D4B598");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ProductId).HasName("PK__products__47027DF50082A97F");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.BasePrice).HasColumnType("decimal(10, 2)").HasColumnName("base_price");
                entity.Property(e => e.Description).HasMaxLength(500).HasColumnName("description");
                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))").HasColumnName("is_deleted");
                entity.Property(e => e.IsVisible).HasDefaultValueSql("((1))").HasColumnName("is_visible");
                entity.Property(e => e.ProductName).HasMaxLength(80).HasColumnName("product_name");
                entity.Property(e => e.Quantity).HasColumnName("quantity");
                entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");
                entity.HasOne(d => d.SubCategory).WithMany(p => p.Products)
                    .HasForeignKey(d => d.SubCategoryId)
                    .HasConstraintName("FK__products__sub_ca__36B12243");
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.HasKey(e => e.ProductImageId).HasName("PK__product___0302EB4A81F0C8B7");
                entity.Property(e => e.ProductImageId).HasColumnName("product_image_id");
                entity.Property(e => e.ImageUrl).HasMaxLength(255).HasColumnName("image_url");
                entity.Property(e => e.IsGia).HasDefaultValueSql("((0))").HasColumnName("is_GIA");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.HasOne(d => d.Product).WithMany(p => p.ProductImages)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__product_i__produ__3F466844");
            });

            modelBuilder.Entity<ProductVariantValue>(entity =>
            {
                entity.HasKey(e => new { e.VariantId, e.ProductId }).HasName("PK__product___AEBC4F683554C815");
                entity.Property(e => e.VariantId).HasColumnName("variant_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.Value).HasMaxLength(80).HasColumnName("value");
                entity.HasOne(d => d.Product).WithMany(p => p.ProductVariantValues)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__product_v__produ__3C69FB99");
                entity.HasOne(d => d.Variant).WithMany(p => p.ProductVariantValues)
                    .HasForeignKey(d => d.VariantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__product_v__varia__3B75D760");
            });

            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.HasKey(e => e.SubCategoryId).HasName("PK__sub_cate__0A556D5F0EB73593");
                entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.Description).HasMaxLength(500).HasColumnName("description");
                entity.Property(e => e.ImageUrl).HasMaxLength(255).HasColumnName("image_url");
                entity.Property(e => e.SubcategoryName).HasMaxLength(30).HasColumnName("subcategory_name");
                entity.HasOne(d => d.Category).WithMany(p => p.SubCategories)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__sub_categ__categ__30F848ED");
            });
            modelBuilder.Entity<CartLineItem>(entity =>
            {
                entity.HasKey(oli => new { oli.ProductId, oli.CartLineId });
                entity.HasOne(oli => oli.Product)
                    .WithMany(p => p.CartLineItems)
                    .HasForeignKey(oli => oli.ProductId);
                entity.HasOne(oli => oli.CartLine)
                    .WithMany(ol => ol.CartLineItems)
                    .HasForeignKey(oli => oli.CartLineId);
            });

            modelBuilder.Entity<CartLine>(entity =>
            {
                entity.HasKey(ol => ol.CartLineId);
                entity.HasOne(ol => ol.Order)
                    .WithMany(o => o.CartLines)
                    .HasForeignKey(ol => ol.OrderId);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.OrderId);
                entity.Property(o => o.OrderId).HasColumnName("order_id");
                entity.Property(o => o.OrderDate).HasColumnName("order_date");
                entity.Property(o => o.UserId).HasColumnName("user_id");
                entity.HasOne(o => o.User)
                    .WithMany(u => u.Orders)
                    .HasForeignKey(o => o.UserId);
            });

            modelBuilder.Entity<DiscountCode>(entity =>
            {
                entity.HasKey(d => d.DiscountId);
                entity.Property(d => d.DiscountId).HasColumnName("discount_id");
                entity.Property(d => d.DiscountCodeName).IsRequired().HasMaxLength(50).HasColumnName("discount_code_name");
                entity.Property(d => d.DiscountPercent).HasColumnType("int").HasColumnName("discount_percent");
                entity.Property(d => d.StartingDate).HasColumnName("starting_date");
                entity.Property(d => d.EndDate).HasColumnName("end_date");
                entity.Property(d => d.IsExpried).HasColumnName("is_expried");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
