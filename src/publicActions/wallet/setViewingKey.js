import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  // checkNetworkOrToken,
} from '../../helpers/checkArguments'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import {
  LIB_EVENT_NAMES,
  VIEWING_KEYS_TYPES
} from '../../constants'
import errors from '../../errors'

export const setViewingKey = async (
  walletId,
  token,
  viewingKeyType,
  options
) => {
  // checks
  checkInitialization()

  // check if options is object first, to set token is required, depend on is there contractAddress in options
  checkTypes(['options', options, ['Object'], true])

  const { viewingKey, fee, privateKey, derivationPath, contractAddress } = options
  
  const isTokenRequired = !contractAddress
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], isTokenRequired],
    ['viewingKeyType', viewingKeyType, ['String']],
    // ['options', options, ['Object'], true]
  )
  // if(isTokenRequired){
  //   checkNetworkOrToken(token)
  // }
  
  checkWalletId(walletId)

  

  checkTypes(
    ['viewingKey', viewingKey, ['String']],
    ['fee', fee, ['String', 'Number']]
  )

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }

  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  // throw error if wallet does not have a private key hash and needs set Simple Viewing Key
  if (
    viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE &&
    !PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)
  ) {
    errors.throwError('WrongArguments', {
      message: `Wallet with "${walletInstance.type}" type does not support Simple Viewing Key installation`,
    })
  }

  // call wallet instance method
  const data = await walletInstance.setViewingKey(
    token,
    viewingKeyType,
    options
  )

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  return data
}
