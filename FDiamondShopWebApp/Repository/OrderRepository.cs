using Azure;
using FDiamondShop.API.Data;
using FDiamondShop.API.Helper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using System.Net.Http;
using System.Net;

namespace FDiamondShop.API.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private readonly FDiamondContext _db;        
        public OrderRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
       
    }

}
