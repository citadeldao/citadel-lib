// function returns request parameters for the axios instance.
export const getIostAccounts = (data) => {
  return {
    // Full url for external request (for axios instance without BASE_URL)
    url: `https://explorer.iost.io/iost-api/accounts/${data.bs58publicKey}`,
    method: 'get',
  }
}
