import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import { checkTypes } from '../../../../helpers/checkArguments'
import crypto from 'crypto'
import { generateSimpleViewingKey } from './generateSimpleViewingKey'
import { executeContract } from './executeContract'
import { SecretNetwork } from '../'

export async function setViewingKey(
  viewingKeyType,
  {
    address,
    contractAddress,
    type,
    publicKey,
    privateKey,
    privateKeyHash,
    derivationPath,
    viewingKey,
    fee = 0.003,
    keplr,
    enigmaUtils,
  } = {}
) {
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 40_000
  // native secret decimals for fee
  const gasPriceInFeeDenom = (fee * 10 ** SecretNetwork.decimals) / gasLimit

  let transactionHash = null
  switch (viewingKeyType) {
    // set simple viewing key
    case VIEWING_KEYS_TYPES.SIMPLE: {
      const simpleViewingKey = generateSimpleViewingKey(
        contractAddress,
        privateKeyHash
      )

      const response = await executeContract({
        address,
        contractAddress,
        message: {
          set_viewing_key: {
            key: simpleViewingKey,
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
        keplr,
        enigmaUtils,
      })
      transactionHash = response.transactionHash
      viewingKey = simpleViewingKey
      break
    }
    // set custom viewing key
    case VIEWING_KEYS_TYPES.CUSTOM: {
      checkTypes(['viewingKey', viewingKey, ['String'], true])
      const response = await executeContract({
        address,
        contractAddress,
        message: {
          set_viewing_key: {
            key: viewingKey,
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
        keplr,
        enigmaUtils,
      })
      if (!response.data || response.data.length < 1) {
        errors.throwError('ViewingKeyError', {
          message: response?.rawLog || 'Viewing Key setting faild',
        })
      }
      transactionHash = response.transactionHash
      break
    }
    // set random viewing key
    case VIEWING_KEYS_TYPES.RANDOM: {
      const entropy = crypto.randomBytes(64).toString('base64')
      const response = await executeContract({
        address,
        contractAddress,
        message: {
          create_viewing_key: {
            entropy,
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
        keplr,
        enigmaUtils,
      })

      if (!response.data || response.data.length < 1) {
        errors.throwError('ViewingKeyError', {
          message: response?.rawLog || 'Viewing Key setting faild',
        })
      }

      const {
        create_viewing_key: { key: randomViewingKey },
      } = JSON.parse(Buffer.from(response.data[0]).toString('utf-8'))
      transactionHash = response.transactionHash
      viewingKey = randomViewingKey
      break
    }
    default: {
      errors.throwError('WrongArguments', {
        message: `Invalid viewingKey type. Expected '${Object.values(
          VIEWING_KEYS_TYPES
        ).join(', ')}', got '${viewingKeyType}'`,
      })
    }
  }

  return { transactionHash, viewingKey }
}
