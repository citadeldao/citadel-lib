import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

/**
 * Checks the validity of all stored viewingKeys for the given wallet.
 * If the stored key is not valid, it is deleted.
 * Also, for all favorit tokens, without a saved key, the validity of the Simple Viewing Key is checked (if the SVK matches, then it is saved).
 * Runs automatically on each initialization and when adding a private Secret wallet.
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * 
 * @returns Returns NULL
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.checkSavedAndSimpleVKValidity('85496')

  // =>
  {
    "result": "success",
    "data": null,
    "error": null
  }
 */

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
