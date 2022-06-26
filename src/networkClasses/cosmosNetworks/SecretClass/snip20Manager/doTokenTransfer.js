import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../constants'
import { getSigner } from './getSigner'
import { getFeeObject } from './getFeeObject'
import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'

export async function doTokenTransfer({
  address,
  contractAddress,
  decimals,
  publicKey,
  privateKey,
  derivationPath,
  type,
  toAddress,
  amount,
  fee,
}) {
  const txEncryptionSeed = EnigmaUtils.GenerateNewSeed()
  const signer = await getSigner({
    privateKey,
    derivationPath,
    type,
    publicKey,
  })

  const client = new SigningCosmWasmClient(
    COSM_WASM_CLIENT_HTTP_URL,
    address,
    signer,
    txEncryptionSeed,
    getFeeObject(fee),
    // do not wait for the transaction to be included in the block, return the hash (prevent timeout error)
    BroadcastMode.Async
  )
  try {
    const { transactionHash } = await client.execute(contractAddress, {
      transfer: {
        owner: address,
        amount: `${+amount * 10 ** decimals}`,
        recipient: toAddress,
      },
    })

    return transactionHash
  } catch (error) {
    if (
      error.message.includes(
        'timed out waiting for tx to be included in a block'
      )
    ) {
      // the transaction was most likely successful
      console.warn(error)
      return null
    }
    throw error
  }
}
