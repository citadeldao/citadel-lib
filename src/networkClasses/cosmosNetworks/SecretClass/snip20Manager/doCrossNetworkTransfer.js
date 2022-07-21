// import { COSM_WASM_CLIENT_HTTP_URL } from '../../../../constants'
// import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
// import { getSigner } from './getSigner'
// import { getFeeObject } from './getFeeObject'
import { SecretNetwork } from '../'
import { executeContract } from './executeContract'

export async function doCrossNetworkTransfer({
  // address,
  type,
  // publicKey,
  // bridgeContract,
  // contractAddress,
  // decimals,
  privateKey,
  derivationPath,
  // toAddress,
  // amount,
  // fee,
}) {
  const address = 'secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq'
  const amount = 0.001
  // SCRT_SWAP_CONTRACT
  const bridgeContract = 'secret1sferux27lpr3lm52c8sq2dd7m54xhm28thnj5y'
  const contractAddress = 'secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw'
  const decimals = 18
  const fee = 0.02
  const publicKey =
    '03f13d0d0d67b34b2a624f042820cef795f997c9afe29a4b8c7a55cd9bed01a487'
  const toAddress = '0x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2'
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 40_000
  // native secret decimals for fee
  const gasPriceInFeeDenom = (+fee * 10 ** SecretNetwork.decimals) / gasLimit

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
    gasLimit: {
      gasLimit,
      gasPriceInFeeDenom,
    },
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
