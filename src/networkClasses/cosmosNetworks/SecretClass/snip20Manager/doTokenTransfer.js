import { executeContract } from './executeContract'
import { SecretNetwork } from '../'

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
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 40_000
  // native secret decimals for fee
  const gasPriceInFeeDenom = (fee * 10 ** SecretNetwork.decimals) / gasLimit
  const transactionHash = await executeContract({
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
  return [transactionHash]
}
