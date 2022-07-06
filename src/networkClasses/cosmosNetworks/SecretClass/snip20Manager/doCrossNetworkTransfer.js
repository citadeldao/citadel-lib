import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../constants'
import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
import { getSigner } from './getSigner'
import { getFeeObject } from './getFeeObject'

export async function doCrossNetworkTransfer({
  address,
  type,
  publicKey,
  bridgeContract,
  contractAddress,
  decimals,
  privateKey,
  derivationPath,
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

  const { transactionHash } = await client.execute(contractAddress, {
    send: {
      amount: `${+amount * 10 ** decimals}`,
      recipient: bridgeContract, // адрес бриджа из сикрета в эфир (для самого эфира и ерц2 токенов)
      msg: Buffer.from(toAddress).toString('base64'), // эфирный адрес получателя
    },
  })

  return [transactionHash]
}
