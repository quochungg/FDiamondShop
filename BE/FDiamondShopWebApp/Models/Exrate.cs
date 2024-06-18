using System.Xml.Serialization;

namespace FDiamondShop.API.Models
{
    public class Exrate
    {
        [XmlAttribute("CurrencyCode")]
        public string CurrencyCode { get; set; }

        [XmlAttribute("Transfer")]
        public decimal Transfer { get; set; }
    }
}
