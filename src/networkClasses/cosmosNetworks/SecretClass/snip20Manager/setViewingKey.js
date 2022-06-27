import errors from '../../../../errors'
import {
  VIEWING_KEYS_TYPES,
  COSM_WASM_CLIENT_HTTP_URL,
} from '../../../../constants'
import { checkTypes } from '../../../../helpers/checkArguments'
import crypto from 'crypto'
import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
import { getSigner } from './getSigner'
import { getFeeObject } from './getFeeObject'
import { generateSimpleViewingKey } from './generateSimpleViewingKey'
import { sleep } from '../../../../helpers/sleep'
import { getTokenBalance } from './getTokenBalance'

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
    fee,
    decimals,
  } = {}
) {
  try {
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

    let transactionHash = null

    switch (viewingKeyType) {
      // set simple viewing key
      case VIEWING_KEYS_TYPES.SIMPLE: {
        const simpleViewingKey = generateSimpleViewingKey(
          contractAddress,
          privateKeyHash
        )
        const response = await client.execute(contractAddress, {
          set_viewing_key: {
            key: simpleViewingKey,
          },
        })
        transactionHash = response.transactionHash
        viewingKey = simpleViewingKey
        break
      }
      // set custom viewing key
      case VIEWING_KEYS_TYPES.CUSTOM: {
        checkTypes(['viewingKey', viewingKey, ['String'], true])
        const response = await client.execute(contractAddress, {
          set_viewing_key: {
            key: viewingKey,
          },
        })
        transactionHash = response.transactionHash
        break
      }
      // set random viewing key
      case VIEWING_KEYS_TYPES.RANDOM: {
        // const entropy = cryptoRandomString({ length: 64, type: 'base64' })
        const entropy = crypto.randomBytes(64).toString('base64')
        const response = await client.execute(contractAddress, {
          create_viewing_key: {
            entropy,
          },
        })
        const {
          create_viewing_key: { key: randomViewingKey },
        } = JSON.parse(Buffer.from(response.data).toString('utf-8'))
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

    if (transactionHash) {
      // wait for the key to be installed before saving it to the instance
      const PAUSE_BETWEEN_CHECKS = 2000
      const MAX_NUMBER_OF_CHECKS = 30
      let currentСheckТumber = 0
      // let balance = { calculatedBalance: 0, mainBalance: 0 }
      while (currentСheckТumber < MAX_NUMBER_OF_CHECKS) {
        // try to get balance with settable key
        const { error } = await getTokenBalance(
          address,
          contractAddress,
          decimals,
          viewingKey
        )

        // break on success
        if (!error) {
          break
        }
        // try again
        await sleep(PAUSE_BETWEEN_CHECKS)
        currentСheckТumber++
      }

      return { transactionHash, viewingKey }
    }
    throw Error
  } catch (error) {
    console.error(error)
    if (error.name === 'WrongArguments') {
      throw error
    }
    errors.throwError('ViewingKeyError', {
      message: `Viewing key setting faild. ${error.message}`,
    })
  }
}
