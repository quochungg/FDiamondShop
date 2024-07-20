namespace FDiamondShop.API.Models
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; }
        public int PageIndex { get; }
        public int TotalPages { get; }
        public int TotalProducts {  get; }
        public bool HasPreviousPage => PageIndex > 1;
        public bool HasNextPage => PageIndex < TotalPages;

        public PaginatedList(List<T> items, int pageIndex, int totalPages, int totalProducts)
        {
            Items = items;
            PageIndex = pageIndex;
            TotalPages = totalPages;
            TotalProducts = totalProducts;  
        }
    }
}
