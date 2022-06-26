import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../constants'
import { getFeeObject } from './getFeeObject'
import { getSigner } from './getSigner'
import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'

export async function convertSecretScrtToScrt({
  address,
  contractAddress,
  type,
  publicKey,
  decimals,
  privateKey,
  derivationPath,
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

  const { transactionHash } = await client.execute(contractAddress, {
    redeem: {
      amount: `${+amount * 10 ** decimals}`,
      padding: '1b31cef91c89a8ae',
    },
  })

  return transactionHash
}
