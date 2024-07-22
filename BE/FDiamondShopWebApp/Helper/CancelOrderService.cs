namespace FDiamondShop.API.Helper
{
    public class CancelOrderService : BackgroundService
    {
        private readonly ILogger<CancelOrderService> _logger;
        private readonly HttpClient _client;
        private readonly TimeSpan _interval = TimeSpan.FromMinutes(1);
        public CancelOrderService(ILogger<CancelOrderService> logger, HttpClient client)
        {
            _logger = logger;
            _client = client;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Call the API
                    var requestUri = "https://fdiamond-api.azurewebsites.net/api/Order/CancelPendingOrders";
                    var requestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);

                    // Optionally, add content if the API expects it
                    // var content = new StringContent("", Encoding.UTF8, "application/json");
                    // requestMessage.Content = content;

                    // Call the API
                    var response = await _client.SendAsync(requestMessage, stoppingToken);

                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync(stoppingToken);
                        _logger.LogInformation("API call successful: {Content}", content);
                    }
                    else
                    {
                        _logger.LogWarning("API call failed with status code {StatusCode}", response.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while calling the API");
                }

                // Wait for the next interval
                await Task.Delay(_interval, stoppingToken);
            }
        }
    }
}
