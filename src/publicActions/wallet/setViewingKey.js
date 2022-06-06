import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const setViewingKey = async (
  walletId,
  token,
  viewingKeyType,
  options
) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['viewingKeyType', viewingKeyType, ['String'], true],
    ['options', options, ['Object'], true]
  )
  checkNetworkOrToken(token)

  checkWalletId(walletId)

  const { viewingKey, fee, privateKey, derivationPath } = options

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
