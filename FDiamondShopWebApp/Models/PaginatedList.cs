namespace FDiamondShop.API.Models
{
    public class PaginatedList<T>
    {
        public int PageIndex { get; }
        public int TotalProduct { get; }
        public List<T> Items { get; }
        public PaginatedList(List<T> items, int pageIndex, int totalProduct)
        {
            Items = items;
            PageIndex = pageIndex;
            TotalProduct = totalProduct;

        }
    }
}
