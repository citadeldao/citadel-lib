import { CACHE_NAMES } from '../../../../constants'
import { SecretNetwork } from '../'
import storage from '../../../../storage'
import { executeContract } from './executeContract'
import errors from '../../../../errors'

export async function convertScrtToSecretScrt({
  address,
  publicKey,
  type,
  privateKey,
  derivationPath,
  amount,
  fee = 0.002,
}) {
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 35_000
  // native secret decimals for fee
  const gasPriceInFeeDenom = (fee * 10 ** SecretNetwork.decimals) / gasLimit
  const response = await executeContract({
    address,
    contractAddress: storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG).secret
      .tokens.secret_scrt.address,
    message: {
      // DATA
      deposit: {
        padding: '6355a6f36bf44cc7',
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
    sentFunds: [
      // sent_funds
      {
        denom: 'uscrt',
        amount: `${+amount * 10 ** SecretNetwork.decimals}`,
      },
    ],
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
