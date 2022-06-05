export const getMarketcap = (data) => {
  return {
    url: `/currency/${data.net}/marketcap`,
    method: 'get',
  }
}