using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Moq;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;

namespace FDiamondShop.Test
{
    public class DiscountCodeTest
    {
        private readonly IUnitOfWork _unitOfWorkMock;
        private readonly List<DiscountCodeData> _testdata;
        private readonly List<DiscountCode> _created;

        private List<DiscountCodeData> LoadTestData(string filePath)
        {
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
            {
                return new List<DiscountCodeData>(csv.GetRecords<DiscountCodeData>());
            }
        }
        public DiscountCodeTest()
        {
            _testdata = LoadTestData("D:\\SE182972\\Summer2024\\SWP\\FDiamondShop\\BE\\FDiamondShop.Test\\discountcode.csv");
            _created = new List<DiscountCode>();

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var discountRepoMock = new Mock <IDiscountRepository>();
            discountRepoMock.Setup(repo => repo.CreateAsync(It.IsAny<DiscountCode>()))
                    .ReturnsAsync((DiscountCode dc) =>
                    {
                        if (_created.Any(c => c.DiscountCodeName.Equals(dc.DiscountCodeName)))
                        {
                            throw new Exception($"Duplicate DiscountCodeName: {dc.DiscountCodeName}");
                        }
                        var foundData = _testdata.FirstOrDefault(d => d.DiscountCodeName.Equals(dc.DiscountCodeName));
                        if(foundData != null)
                        {
                            dc.DiscountId = foundData.DiscountId;
                            dc.DiscountPercent = foundData.DiscountPercent;
                            _created.Add(dc);
                            return dc;
                        }
                        throw new Exception("DiscountCode not found in test data.");

                    });
            unitOfWorkMock.Setup(unitOfWork => unitOfWork.DiscountCodeRepository).Returns(discountRepoMock.Object);
            _unitOfWorkMock = unitOfWorkMock.Object;
        }
        public class DiscountCodeData
        {
            public int DiscountId { get; set; }
            public string DiscountCodeName { get; set; }
            public int DiscountPercent { get; set; } = 0;

        }
        [Fact]
        public async Task Test_DiscountCode()
        {
            try
            {
                if(_unitOfWorkMock == null)
                {
                    throw new NullReferenceException("UnitofWork null");
                }
                if(_unitOfWorkMock.DiscountCodeRepository == null)
                {
                    throw new NullReferenceException("DiscounRepo null");
                }
                
                foreach (var data in _testdata)
                {
                    var createDiscountCode = await _unitOfWorkMock.DiscountCodeRepository.CreateAsync(new DiscountCode{
                        DiscountCodeName = data.DiscountCodeName,
                        DiscountPercent = data.DiscountPercent,
                    });
                    Assert.NotNull(createDiscountCode);
                    Assert.Equal(data.DiscountId, createDiscountCode.DiscountId);
                    Assert.Equal(data.DiscountCodeName, createDiscountCode.DiscountCodeName);
                    Assert.Equal(data.DiscountPercent, createDiscountCode.DiscountPercent);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            
        }
        
    }
}
