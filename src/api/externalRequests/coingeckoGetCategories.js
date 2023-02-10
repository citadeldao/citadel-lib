export const coingeckoGetCategories = ({order}) => {
    return {
      // Full url for external request (for axios instance without BASE_URL)
      url: `https://api.coingecko.com/api/v3/coins/categories${order ? `?order=${order}`: ''}`,
      method: 'get',
    }
  }