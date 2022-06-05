import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../../constants'
import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
import { getSigner } from './getSigner'
import { getFeeObject } from './getFeeObject'
import SecretNetwork from '../'

export async function convertScrtToSecretScrt({
  address,
  publicKey,
  type,
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

  const { transactionHash } = await client.execute(
    SecretNetwork.tokens.secret_scrt.address,
    {
      // DATA
      deposit: {
        padding: '6355a6f36bf44cc7',
      },
    },
    '', // memo
    [
      // sent_funds
      {
        denom: 'uscrt',
        amount: `${+amount * 10 ** SecretNetwork.decimals}`,
      },
    ]
  )
  return transactionHash
}
