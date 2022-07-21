import { SecretNetworkClient } from 'secretjs'
import { GRPC_WEB_URL } from '../../../../constants'

export async function getTokenTransactions({
  address,
  contractAddress,
  viewingKey,
  page,
  pageSize,
}) {
  // prepare readOnly secret client
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl: GRPC_WEB_URL,
    chainId: 'secret-4',
  })

  // get contract codeHash
  const codeHash = await secretjs.query.compute.contractCodeHash(
    contractAddress
  )

  try {
    // get token transfer history
    const resp = await secretjs.query.snip20.getTransferHistory({
      address,
      contract: {
        address: contractAddress,
        codeHash,
      },
      auth: {
        key: viewingKey,
      },
      page_size: +pageSize,
      page: +page,
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
