﻿using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using System.Globalization;
using System.Xml.Serialization;

namespace FDiamondShop.API.Repository
{
    public class ExchangeRepository : IExchangeRepository
    {
        private readonly HttpClient _httpClient;
        public ExchangeRepository(HttpClient httpClient) 
        {
            _httpClient = httpClient;
        }
        public async Task<decimal> ExchangeMoneyToVND(decimal amount, string fromCurrency)
        {
            string url = "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx";
            var response = await _httpClient.GetStringAsync(url);
            Console.WriteLine(response);
            response = response.Replace(",", "");
            var serializer = new XmlSerializer(typeof(ExrateList));
            ExrateList exrateList;
            using (var reader = new StringReader(response))
            {
                exrateList = (ExrateList)serializer.Deserialize(reader);
            }
            var rate = exrateList.Exrates.FirstOrDefault(x => x.CurrencyCode == fromCurrency);
            if (rate == null)
            {
                throw new ArgumentException($"Currency code '{fromCurrency}' not found.");
            }

           

            decimal result = amount * rate.Transfer;

            return result;
        }      
    }
}
