import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import { checkTypes } from '../../../../helpers/checkArguments'
import { generateSimpleViewingKey } from './generateSimpleViewingKey'
import { executeContract } from './executeContract'
import { SecretNetwork } from '../'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

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
  } = {}
) {
  // gasLimit was estimated earlier for this method via transaction simulation (.simulate())
  const gasLimit = 175_000
  // native secret decimals for fee
  const getGasPriceInFeeDenom = (fee)=> {
    return (fee * 10 ** SecretNetwork.decimals) / gasLimit
  }
  //callback to pass to show tx and handle change of fee
  const callBackHandler = async (msgs)=> {
    const txForShowClient = {
      chainId: SecretNetwork.chain_id,
      msgs: [msgs],
      fee: {amount:[{amount: fee}]}
    }

    const res = await dispatchLibEvent(LIB_EVENT_NAMES.EXTENSION_TX_MIDDLEWARE, 
      {
        signDoc: txForShowClient,
        wallet: {address, net: SecretNetwork.net}
      })
    if(res?.error){
      errors.throwError('ViewingKeyError', {
        message: 'Transaction has been rejected',
      })
    }
    //change fee, if it has been changed from in client
    if(res?.data?.fee){
      gasPriceInFeeDenom = getGasPriceInFeeDenom(res?.data?.fee)
    }
  }

  let gasPriceInFeeDenom = getGasPriceInFeeDenom(fee)

  let transactionHash = null
  switch (viewingKeyType) {
    // set simple viewing key
    case VIEWING_KEYS_TYPES.SIMPLE: {
      const simpleViewingKey = await generateSimpleViewingKey(
        contractAddress,
        privateKeyHash
      )
      //tx structure to show
      const msgs = {
        set_viewing_key: {
          key: simpleViewingKey,
        },
      }
      //call callback
      await callBackHandler(msgs)
      
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
      })
      if (!response.data || response.data.length < 1) {
        errors.throwError('ViewingKeyError', {
          message: response?.rawLog || 'Viewing Key setting faild',
        })
      }
      transactionHash = response.transactionHash
      viewingKey = simpleViewingKey
      break
    }
    // set custom viewing key
    case VIEWING_KEYS_TYPES.CUSTOM: {
      checkTypes(['viewingKey', viewingKey, ['String'], true])
      //tx structure to show
      const msgs = {
        set_viewing_key: {
          key: viewingKey,
        },
      }
      //call callback
      await callBackHandler(msgs)
     
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
      // dynamic import of large module (for fast init)
      const { default: crypto } = await import('crypto')
      const entropy = crypto.randomBytes(64).toString('base64')

      //tx structure to show
      const msgs = {
        create_viewing_key: {
          entropy,
        },
      }
      //call callback
      await callBackHandler(msgs)
    
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
      })

      if (!response.data || response.data.length < 1) {
        errors.throwError('ViewingKeyError', {
          message: response?.rawLog || 'Viewing Key setting faild',
        })
      }
      const rawJsonData = Buffer.from(response.data[0]).toString('utf-8')
      const cleanJsonData = rawJsonData.slice(rawJsonData.search('{'))
      const {
        create_viewing_key: { key: randomViewingKey },
      } = JSON.parse(cleanJsonData)
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
