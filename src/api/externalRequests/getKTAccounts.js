// function returns request parameters for the axios instance.
export const getKTAccounts = (data) => {
  // Full url for external request (for axios instance without BASE_URL)
  return {
    url: `https://api.tzkt.io/v1/accounts/${data.address}/contracts`,
    method: 'get',
  }
}
