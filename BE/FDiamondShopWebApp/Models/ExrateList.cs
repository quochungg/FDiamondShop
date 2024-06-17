using System.Xml.Serialization;

namespace FDiamondShop.API.Models
{
    public class ExrateList
    {
        [XmlElement("Exrate")]
        public List<Exrate> Exrates { get; set; }
    }
}
