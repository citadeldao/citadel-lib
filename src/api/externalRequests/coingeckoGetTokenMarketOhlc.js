// function returns request parameters for the axios instance.
export const coingeckoGetTokenMarketOhlc = ({id, currency='usd', days=1}) => {
    return {
      // Full url for external request (for axios instance without BASE_URL)
      url: `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=${days}`,
      method: 'get',
    }
  }