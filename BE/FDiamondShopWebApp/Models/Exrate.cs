using System.Xml.Serialization;

namespace FDiamondShop.API.Models
{
    public class Exrate
    {
        [XmlAttribute("CurrencyCode")]
        public string CurrencyCode { get; set; }

        [XmlAttribute("CurrencyName")]
        public string CurrencyName { get; set; }

        [XmlAttribute("Buy")]
        public decimal Buy { get; set; }

        [XmlAttribute("Transfer")]
        public decimal Transfer { get; set; }

        [XmlAttribute("Sell")]
        public decimal Sell { get; set; }
    }
}
