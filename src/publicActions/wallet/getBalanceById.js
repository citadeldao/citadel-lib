import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

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
