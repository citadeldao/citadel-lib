import { SecretNetwork } from '../'
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
  fee = 0.002,
}) {
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
}
