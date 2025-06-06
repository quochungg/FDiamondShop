﻿using FDiamondShop.API.Helper;
using FDiamondShop.API.Repository.IRepository;
using PayPal.Core;
using PayPal.v1.Payments;

using System.Net;
using PaymentCreateRequest = PayPal.v1.Payments.PaymentCreateRequest;

namespace FDiamondShop.API.Repository
{
    public class PayPalRepository : IPayPalRepository
    {
        private readonly IConfiguration _configuration;
        

        public PayPalRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        

        public async Task<string> CreatePaymentUrl(PaymentInformationModel model)
        {
            // var envProd = new LiveEnvironment(_configuration["PaypalProduction:ClientId"],
            //     _configuration["PaypalProduction:SecretKey"]);

            var envSandbox =
                new SandboxEnvironment(_configuration["Paypal:ClientId"], _configuration["Paypal:SecretKey"]);
            var client = new PayPalHttpClient(envSandbox);
            var paypalOrderId = DateTime.Now.Ticks;
            var urlCallBack = _configuration["PaymentPayPalCallBack:ReturnUrl"];
            var payment = new PayPal.v1.Payments.Payment()
            {
                Intent = "sale",
                Transactions = new List<Transaction>()
                {
                    new Transaction()
                    {
                        Amount = new Amount()
                        {
                            Total = model.Amount.ToString(),
                            Currency = "USD",
                            Details = new AmountDetails
                            {
                                Tax = "0",
                                Shipping = "0",
                                Subtotal = model.Amount.ToString(),
                            }
                        },
                        ItemList = new ItemList()
                        {
                            Items = new List<Item>()
                            {
                                new Item()
                                {
                                    Name = " | Order: " + model.OrderDescription,
                                    Currency = "USD",
                                    Price = model.Amount.ToString(),
                                    Quantity = 1.ToString(),
                                    Sku = "sku",
                                    Tax = "0",
                                    
                                }
                            }
                        },
                        Description = $"Invoice #{model.OrderDescription}",
                        InvoiceNumber = paypalOrderId.ToString()
                    }
                },
                RedirectUrls = new RedirectUrls()
                {
                    ReturnUrl =
                        $"{urlCallBack}?payment_method=PayPal&success=1&order_id={model.OrderID}",
                    CancelUrl =
                        $"{urlCallBack}?payment_method=PayPal&success=0&order_id={model.OrderID}"
                },
                Payer = new Payer()
                {
                    PaymentMethod = "paypal"
                }
            };

            var request = new PaymentCreateRequest();
            request.RequestBody(payment);

            var paymentUrl = "";
            var response = await client.Execute(request);
            var statusCode = response.StatusCode;

            if (statusCode is not (HttpStatusCode.Accepted or HttpStatusCode.OK or HttpStatusCode.Created))
                return paymentUrl;

            var result = response.Result<Payment>();
            using var links = result.Links.GetEnumerator();

            while (links.MoveNext())
            {
                var lnk = links.Current;
                if (lnk == null) continue;
                if (!lnk.Rel.ToLower().Trim().Equals("approval_url")) continue;
                paymentUrl = lnk.Href;
            }

            return paymentUrl;

        }


        public PayPalResponseModel PaymentExecute(IQueryCollection collections)
        {
            var response = new PayPalResponseModel();

            foreach (var (key, value) in collections)
            {             

                if (!string.IsNullOrEmpty(key) && key.ToLower().Equals("order_id"))
                {
                    response.OrderId = value;
                }

                if (!string.IsNullOrEmpty(key) && key.ToLower().Equals("payment_method"))
                {
                    response.PaymentMethod = value;
                }

                if (!string.IsNullOrEmpty(key) && key.ToLower().Equals("success"))
                {
                    response.Success = Convert.ToInt32(value) > 0;
                }

                if (!string.IsNullOrEmpty(key) && key.ToLower().Equals("paymentid"))
                {
                    response.PaymentId = value;
                }              
            }

            return response;
        }

        
    }
}
