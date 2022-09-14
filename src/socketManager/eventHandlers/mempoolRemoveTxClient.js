import walletsManager from '../../walletsManager'
import networkClasses from '../../networkClasses'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'
import state from '../../state'
import { isNativeToken } from '../../helpers/isNativeToken'
import { debugConsole } from '../../helpers/debugConsole'

export const mempoolRemoveTxClient = async (data) => {
  const { from, net, to, type } = data
  // get supportedTokens { token: nativeNet }
  const supportedTokens = state.getState('supportedTokens')

  // for this types add flag to data for update subtokensList
  data.updateStakeListRequired = [
    'stake',
    'unstake',
    'restake',
    'redelegation',
  ].includes(type)
  const isSubtoken = !isNativeToken(net)
  const nativeNet = networkClasses.getNativeNet(net)

  const fromWallet = walletsManager.getWalletInfoByAddress(nativeNet, from)

  const toWallet = walletsManager.getWalletInfoByAddress(nativeNet, to)
  // update nativeNet or token balance
  fromWallet && (await getBalanceById(fromWallet.id, net))
  toWallet &&
    toWallet.address !== fromWallet?.address &&
    (await getBalanceById(toWallet.id, net))
  // update native token for subtoken
  isSubtoken &&
    fromWallet &&
    (await getBalanceById(fromWallet.id, supportedTokens[net]))
  isSubtoken &&
    toWallet &&
    toWallet.address !== fromWallet?.address &&
    (await getBalanceById(toWallet.id, supportedTokens[net]))

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}

const getBalanceById = async (walletId, token) => {
  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  if (!token || token === walletInstance.net) {
    // for subtoken call token info
    try {
      return await walletInstance.getDelegationBalance()
    } catch (error) {
      debugConsole.error(error)
    }
  } else {
    // for native token call walletInstance method
    try {
      return await walletInstance.callTokenInfo(token, 'balance')
    } catch (error) {
      debugConsole.error(error)
    }
  }
}
