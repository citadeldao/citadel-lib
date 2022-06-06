import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const importViewingKey = async (walletId, token, viewingKey) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['viewingKey', viewingKey, ['String'], true]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)

  // call wallet instance method
  await walletInstances
    .getWalletInstanceById(walletId)
    .importViewingKey(token, viewingKey)

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
