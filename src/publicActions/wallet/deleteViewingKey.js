import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

/**
 * Accepts a message and returns a signature for it
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - Secret wallet id
 * @param token  STRING (REQUIRED) - the token for which the Viewing Key is being removed
 *
 * @returns Returns NULL
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = citadel.deleteViewingKey(walletId, 'secret_scrt')

  // =>
  {
    "result": "success",
    "data": null,
    "error": null
  }
 */

export const deleteViewingKey = async (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true]
  )
  checkWalletId(walletId)

  // call walletInstance method
  await walletInstances.getWalletInstanceById(walletId).deleteViewingKey(token)

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
