using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Moq;
using System.Linq.Expressions;

namespace FDiamondShop.Test
{
    public class TestProduct
    {
        private readonly Mock<IProductRepository> _productRepositoryMock;

        public TestProduct()
        {
            _productRepositoryMock = new Mock<IProductRepository>();
        }

        [Fact]
        public async Task GetProductById_Success()
        {
            // Arrange
            var productId = 1;
            var product = new Product { ProductId = productId, ProductName = "Test Product" };


            Expression<Func<Product, bool>> filter = p => p.ProductId == productId;

            _productRepositoryMock.Setup(r => r.GetAsync(filter, true, null))
                .ReturnsAsync(product);

            // Act
            var result = await _productRepositoryMock.Object.GetAsync(filter);

            // Assert
            Assert.Equal(productId, result.ProductId);
            Assert.Equal("Test Product", result.ProductName);
        }

        [Fact]
        public async Task GetProductById_Fail()
        {
            // Arrange
            var productId = 1;
            Product? product = null; 

            Expression<Func<Product, bool>> filter = p => p.ProductId == productId;

            _productRepositoryMock.Setup(r => r.GetAsync(filter, true, null))
                .ReturnsAsync(product);

            // Act
            var result = await _productRepositoryMock.Object.GetAsync(filter);

            // Assert
            Assert.Null(result); 
        }

        [Fact]
        public async Task GetAllProduct_Success()
        {
            //Arrange
            var products = new List<Product>
            {
                new Product { ProductId = 1, ProductName = "Test Product 1" },
                new Product { ProductId = 2, ProductName = "Test Product 2" },
                new Product { ProductId = 3, ProductName = "Test Product 3" }
            };

            _productRepositoryMock.Setup(r => r.GetAllAsync(null, null))
                .ReturnsAsync(products);

            //Act
            var result = await _productRepositoryMock.Object.GetAllAsync();

            //Assert
            Assert.Equal(3, result.Count);
            Assert.Equal("Test Product 1", result[0].ProductName);
            Assert.Equal("Test Product 2", result[1].ProductName);
            Assert.Equal("Test Product 3", result[2].ProductName);
        }

        [Fact]
        public async Task GetAllProduct_Fail()
        {
            //Arrange
            List<Product>? products = null;

            _productRepositoryMock.Setup(r => r.GetAllAsync(null, null))
                .ReturnsAsync(products);

            //Act
            var result = await _productRepositoryMock.Object.GetAllAsync();

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task CreateProduct_Success()
        {
            //Arrange
            var product = new Product { ProductId = 1, ProductName = "Test Product" };

            _productRepositoryMock.Setup(r => r.CreateAsync(product))
                .ReturnsAsync(product);

            //Act
            var result = await _productRepositoryMock.Object.CreateAsync(product);

            //Assert
            Assert.Equal(1, result.ProductId);
            Assert.Equal("Test Product", result.ProductName);
        }

        [Fact]
        public async Task CreateProduct_Fail()
        {
            //Arrange
            Product? product = null;

            _productRepositoryMock.Setup(r => r.CreateAsync(product))
                .ReturnsAsync(product);

            //Act
            var result = await _productRepositoryMock.Object.CreateAsync(product);

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateProduct_Success()
        {
            //Arrange
            var productDTO = new ProductUpdateDTO { ProductId = 1, ProductName = "Test Product" };
            Product product = new Product { ProductId = 1, ProductName = "Test Product" }; 

            _productRepositoryMock.Setup(r => r.UpdateProduct(productDTO))
                .ReturnsAsync(product);

            //Act
            var result = await _productRepositoryMock.Object.UpdateProduct(productDTO);

            //Assert
            Assert.Equal(1, result.ProductId);
            Assert.Equal("Test Product", result.ProductName);
        }

        [Fact]
        public async Task UpdateProduct_Fail()
        {
            //Arrange
            ProductUpdateDTO productDTO = new ProductUpdateDTO { ProductId = 1, ProductName = "Test Product" };
            Product product = null;
            _productRepositoryMock.Setup(r => r.UpdateProduct(productDTO))
                .ReturnsAsync(product);

            //Act
            var result = await _productRepositoryMock.Object.UpdateProduct(productDTO);

            //Assert
            Assert.Null(result);
        }
    }
}
