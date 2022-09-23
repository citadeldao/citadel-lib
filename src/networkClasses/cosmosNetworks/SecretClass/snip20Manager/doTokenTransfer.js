import { executeContract } from './executeContract'
import { SecretNetwork } from '../'
import errors from '../../../../errors'

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
  fee = 0.003,
}) {
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 225_000
  // native secret decimals for fee
  const gasPriceInFeeDenom = (fee * 10 ** SecretNetwork.decimals) / gasLimit
  const response = await executeContract({
    address,
    contractAddress,
    message: {
      transfer: {
        recipient: toAddress,
        amount: `${+amount * 10 ** decimals}`,
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

  // check error (not sure if this is a reliable way)
  if (response.data?.length === 0) {
    // throw error if data array is empty
    errors.throwError('RequestError', {
      message: response.rawLog,
    })
  }

  return [response.transactionHash]
}
