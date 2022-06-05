export const getIostAccounts = (data) => {
  return {
    url: `https://explorer.iost.io/iost-api/accounts/${data.bs58publicKey}`,
    method: 'get',
  }
}
