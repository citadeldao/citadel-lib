import { queryContract } from './queryContract'

export async function getTokenTransactions({
  address,
  contractAddress,
  viewingKey,
  page,
  pageSize,
}) {
  try {
    // get token transfer history
    const resp = await queryContract({
      contractAddress,
      query: {
        transfer_history: {
          address,
          key: viewingKey,
          page,
          page_size: pageSize,
        },
      },
    })

    if (resp?.transfer_history?.txs) {
      return {
        error: false,
        list: resp.transfer_history.txs,
      }
    }
    throw Error
  } catch (err) {
    return { error: err, list: null }
  }
}
