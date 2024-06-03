using System;
using FDiamondShop.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Data;

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

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CategoryVariant> CategoryVariants { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<ProductVariantValue> ProductVariantValues { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__accounts__46A222CD8ABCA3F2");

            entity.ToTable("accounts");

            entity.HasIndex(e => e.Email, "UQ__accounts__AB6E6164A2413C2B").IsUnique();

            entity.Property(e => e.AccountId).HasColumnName("account_id");
            entity.Property(e => e.DateCreate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date_create");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.Googleid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("googleid");
            entity.Property(e => e.IsGoogleAccount)
                .HasDefaultValueSql("((0))")
                .HasColumnName("is_google_account");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password_hash");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValueSql("('Customer')")
                .HasColumnName("role");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__categori__D54EE9B40910DE00");

            entity.ToTable("categories");

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(30)
                .HasColumnName("category_name");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
        });

        modelBuilder.Entity<CategoryVariant>(entity =>
        {
            entity.HasKey(e => e.VariantId).HasName("PK__category__EACC68B780BFAFCD");

            entity.ToTable("category_variants");

            entity.Property(e => e.VariantId).HasColumnName("variant_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.VariantName)
                .HasMaxLength(30)
                .HasColumnName("variant_name");

            entity.HasOne(d => d.Category).WithMany(p => p.CategoryVariants)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__category___categ__33D4B598");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__products__47027DF50082A97F");

            entity.ToTable("products");

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.BasePrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("base_price");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("((0))")
                .HasColumnName("is_deleted");
            entity.Property(e => e.IsVisible)
                .HasDefaultValueSql("((1))")
                .HasColumnName("is_visible");
            entity.Property(e => e.ProductName)
                .HasMaxLength(80)
                .HasColumnName("product_name");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");

            entity.HasOne(d => d.SubCategory).WithMany(p => p.Products)
                .HasForeignKey(d => d.SubCategoryId)
                .HasConstraintName("FK__products__sub_ca__36B12243");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.ProductImageId).HasName("PK__product___0302EB4A81F0C8B7");

            entity.ToTable("product_images");

            entity.Property(e => e.ProductImageId).HasColumnName("product_image_id");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.IsGia)
                .HasDefaultValueSql("((0))")
                .HasColumnName("is_GIA");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductImages)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__product_i__produ__3F466844");
        });

        modelBuilder.Entity<ProductVariantValue>(entity =>
        {
            entity.HasKey(e => new { e.VariantId, e.ProductId }).HasName("PK__product___AEBC4F683554C815");

            entity.ToTable("product_variant_values");

            entity.Property(e => e.VariantId).HasColumnName("variant_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Value)
                .HasMaxLength(80)
                .HasColumnName("value");

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

            entity.ToTable("sub_categories");

            entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.SubcategoryName)
                .HasMaxLength(30)
                .HasColumnName("subcategory_name");

            entity.HasOne(d => d.Category).WithMany(p => p.SubCategories)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__sub_categ__categ__30F848ED");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
