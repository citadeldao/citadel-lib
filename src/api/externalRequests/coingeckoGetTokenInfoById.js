// function returns request parameters for the axios instance.
export const coingeckoGetTokenInfoById = ({
    id, 
    localization=true, 
    tickers=true, 
    market_data=true, 
    community_data=true,
    developer_data=true, 
    sparkline=true
}) => {
    return {
      // Full url for external request (for axios instance without BASE_URL)
      url: `https://api.coingecko.com/api/v3/coins/${id}?localization=${localization}
      &tickers=${tickers}&market_data=${market_data}
      &community_data=${community_data}&developer_data=${developer_data}&sparkline=${sparkline}`,
      method: 'get',
    }
  }