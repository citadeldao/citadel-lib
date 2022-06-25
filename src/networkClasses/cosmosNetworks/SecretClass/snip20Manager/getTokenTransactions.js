import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../constants'
import { getFeeObject } from './getFeeObject'

export async function getTokenTransactions({
  address,
  contractAddress,
  viewingKey,
  page,
  pageSize,
}) {
  // dynamic import of large module (for fast init)
  const { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } = await import(
    'secretjs'
  )
  const txEncryptionSeed = EnigmaUtils.GenerateNewSeed()
  const client = new SigningCosmWasmClient(
    COSM_WASM_CLIENT_HTTP_URL,
    address,
    () => {},
    txEncryptionSeed,
    getFeeObject(),
    // do not wait for the transaction to be included in the block, return the hash (prevent timeout error)
    BroadcastMode.Async
  )
  try {
    const resp = await client.queryContractSmart(contractAddress, {
      transfer_history: {
        key: viewingKey,
        address,
        page_size: +pageSize,
        page: +page,
      },
    })
    if (resp?.transfer_history?.txs)
      return {
        error: false,
        list: resp.transfer_history.txs,
      }
    throw Error
  } catch (err) {
    return { error: err, list: null }
  }
}
