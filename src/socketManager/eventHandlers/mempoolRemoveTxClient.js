import walletsManager from '../../walletsManager'
import networkClasses from '../../networkClasses'
// TODO: refact publicActions.getBalanceById, move function to walletInstance method and use here
import publicActions from '../../publicActions'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import { LIB_EVENT_NAMES, CACHE_NAMES } from '../../constants'
import state from '../../state'

export const mempoolRemoveTxClient = async ({ from, net, to, type }) => {
  // get supportedTokens { token: nativeNet }
  const supportedTokens = state.getState('supportedTokens')

  // for this types return flag for update subtokensList
  const updateStakeListRequired = ['stake', 'unstake', 'restake'].includes(type)
  const isSubtoken = !state
    .getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS)
    .includes(net)
  const nativeNet = networkClasses.getNativeNet(net)

  const fromWallet = walletsManager.getWalletInfoByAddress(nativeNet, from)

  const toWallet = walletsManager.getWalletInfoByAddress(nativeNet, to)
  // update nativeNet or token balance
  fromWallet && (await publicActions.getBalanceById(fromWallet.id, net))
  toWallet &&
    toWallet.address !== fromWallet?.address &&
    (await publicActions.getBalanceById(toWallet.id, net))
  // update native token for subtoken
  isSubtoken &&
    fromWallet &&
    (await publicActions.getBalanceById(fromWallet.id, supportedTokens[net]))
  isSubtoken &&
    toWallet &&
    toWallet.address !== fromWallet?.address &&
    (await publicActions.getBalanceById(toWallet.id, supportedTokens[net]))

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
  return { updateStakeListRequired }
}
