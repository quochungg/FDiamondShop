namespace FDiamondShop.API.Helper
{
    using System;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Hosting;

    public class TimedHostedService : IHostedService, IDisposable
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private Timer _timer;

        public TimedHostedService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(30));
            return Task.CompletedTask;
        }

        private async void DoWork(object state)
        {
            var client = _httpClientFactory.CreateClient();
            try
            {
                var response = await client.PutAsync("https://fdiamond-api.azurewebsites.net/Discount/UpdateAuto", null);
                
              response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException)
            {
                // Handle error silently or take necessary action
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }


}
