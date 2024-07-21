using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface ICartRepository : IRepository<CartLine>
    {
        Task CreateCartlineItem(CartLineItem cartLineItem);
        Task RemoveRange(List<CartLineItem> cartLineItems);
        public Task<List<CartLine>> GetAllCartlineExist(ApplicationUser user);
        public Task<CartLine> FindCartlineId(int cartLineId);
        public Task<List<CartLineItem>> GetCartLineItems(int cartLineId);
        public Task<ValidCartLineDTO> ValidCartLine(string userId);
        public Task UpdateRingSize(CartUpdateDTO updateDTO);
        public Task<Boolean> CheckCompletedRing(CreateCartDTO dto);
        public Task<List<CartLine>> GetAllCartLineByUserId(string userId);
    }
}
