// function returns request parameters for the axios instance.
export const coingeckoGetTokenMarketChart = ({id, currency='usd', days=1}) => {
    return {
      // Full url for external request (for axios instance without BASE_URL)
      url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
      method: 'get',
    }
  }