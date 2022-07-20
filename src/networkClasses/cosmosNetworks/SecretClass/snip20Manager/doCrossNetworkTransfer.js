// import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../constants'
// import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
// import { getSigner } from './getSigner'
// import { getFeeObject } from './getFeeObject'
import { executeContract } from './executeContract'

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
  // // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  // const gasLimit = 40_000
  // // native secret decimals for fee
  // const gasPriceInFeeDenom = (fee * 10 ** SecretNetwork.decimals) / gasLimit
  const response = await executeContract({
    address,
    contractAddress,
    message: {
      send: {
        amount: `${+amount * 10 ** decimals}`,
        recipient: bridgeContract,
        msg: Buffer.from(toAddress).toString('base64'),
      },
    },
    // gasLimit: {
    //   gasLimit,
    //   gasPriceInFeeDenom,
    // },
    privateKey,
    derivationPath,
    type,
    publicKey,
  })
  return [response.transactionHash]

  // const txEncryptionSeed = EnigmaUtils.GenerateNewSeed()
  // const signer = await getSigner({
  //   privateKey,
  //   derivationPath,
  //   type,
  //   publicKey,
  // })
  // const client = new SigningCosmWasmClient(
  //   COSM_WASM_CLIENT_HTTP_URL,
  //   address,
  //   signer,
  //   txEncryptionSeed,
  //   getFeeObject(fee),
  //   // do not wait for the transaction to be included in the block, return the hash (prevent timeout error)
  //   BroadcastMode.Async
  // )

  // const { transactionHash } = await client.execute(contractAddress, {
  //   send: {
  //     amount: `${+amount * 10 ** decimals}`,
  //     recipient: bridgeContract, // адрес бриджа из сикрета в эфир (для самого эфира и ерц2 токенов)
  //     msg: Buffer.from(toAddress).toString('base64'), // эфирный адрес получателя
  //   },
  // })

  // return [transactionHash]
}
