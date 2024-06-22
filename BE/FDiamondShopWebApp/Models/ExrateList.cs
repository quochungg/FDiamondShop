using System.Xml.Serialization;

namespace FDiamondShop.API.Models
{
   
    [XmlRoot("ExrateList")]

    public class ExrateList
    {
        [XmlElement("Exrate")]
        public List<Exrate> Exrates { get; set; }
    }
}
