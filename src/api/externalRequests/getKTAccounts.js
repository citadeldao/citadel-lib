export const getKTAccounts = (data) => {
  return {
    url: `https://api.tzkt.io/v1/accounts/${data.address}/contracts`,
    method: 'get',
  }
}
