import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

/**
 *  Get an object with wallet balances by its id
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 *
 * @returns Returns OBJECT
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getBalanceById('528556')

  // =>
  {
    "result": "success",
    "data": {
      "mainBalance": 0.00008097,
      "delegatedBalance": 0,
      "originatedAddresses": [],
      "adding": [],
      "stake": 0,
      "frozenBalance": 0,
      "frozen": [],
      "unstake": 0,
      "calculatedBalance": 0.00008097
    },
    "error": null
  }
 */

export const getBalanceById = async (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String']]
  )
  checkWalletId(walletId)
  token && checkNetworkOrToken(token)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (!token || token === walletInstance.net) {
    // for subtoken call token info
    const balance = await walletInstance.getDelegationBalance()
    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
    return balance
  } else {
    // for native token call walletInstance method
    return await walletInstance.callTokenInfo(token, 'balance')
  }
}
