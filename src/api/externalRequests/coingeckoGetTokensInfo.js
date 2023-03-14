// function returns request parameters for the axios instance.
export const coingeckoGetTokensInfo = ({currency='usd', perPage=10, page=1, category, ids}) => {
    return {
      // Full url for external request (for axios instance without BASE_URL)
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d,30d${category ? `&category=${category}`: ''}${ids ? `&ids=${ids}`: ''}`,
      method: 'get',
    }
  }