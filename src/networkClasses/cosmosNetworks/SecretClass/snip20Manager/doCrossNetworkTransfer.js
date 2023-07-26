import { SecretNetwork } from '../'
import { executeContract } from './executeContract'
import errors from '../../../../errors'

export async function doCrossNetworkTransfer({
  address,
  type,
  publicKey,
  bridgeContract,
  contractAddress,
  decimals,
  privateKey,
  derivationPath,
  transportType,
  toAddress,
  // for secret_eth - 0.1 minimum
  amount,
  fee = 0.006,
}) {
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 500_000
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
    transportType,
    type,
    publicKey,
  })

  // check error (not sure if this is a reliable way)
  if (response.data?.length === 0) {
    // throw error if data array is empty
    errors.throwError('RequestError', {
      message: response.rawLog,
    })
  }

  return [response.transactionHash]
}
