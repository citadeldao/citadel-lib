import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../../constants'
import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
import { getFeeObject } from './getFeeObject'

export async function getTokenBalance(
  address,
  contractAddress,
  decimals,
  viewingKey
) {
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
      balance: {
        key: viewingKey,
        address,
      },
    })

    if (resp.balance && resp.balance.amount)
      return {
        error: false,
        amount: resp.balance.amount / 10 ** decimals,
      }

    throw new Error(resp?.viewing_key_error?.msg)
  } catch (err) {
    return { error: err, amount: null }
  }
}
