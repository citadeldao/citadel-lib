import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const checkSavedAndSimpleVKValidity = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // call walletInstance method (function already contains updateWalletList event inside)
  return await walletInstances
    .getWalletInstanceById(walletId)
    .checkSavedAndSimpleVKValidity()
}
