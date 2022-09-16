import networkClasses from './networkClasses'
import { merge } from './helpers/merge'
import { debugConsole } from './helpers/debugConsole'

/******************** WALLET INSTANCES MODULE *************************
 * Сollection of network class instances created from store.wallets list (local storage).
 * Used to call specific wallet methods in publicActions (prepareTransfer, getBalanceById, etc.)
 * WalletsManager first updates the list of wallets in the store, and then in the walletInstances collection
 *
 * HOW TO USE:
 * const balance = await walletinstances.getBalanceById(walletId)
 **********************************************************/

const instanceCollection = new Map()

const clearWalletInstances = () => instanceCollection.clear()

const getWalletInstanceById = (walletId) => instanceCollection.get(walletId)

const getWalletInstanceByAddress = (net, address) => {
  for (const wallet of instanceCollection) {
    if (wallet[1].net === net && wallet[1].address === address) {
      return wallet[1]
    }
  }
}

const removeWalletInstanceById = (walletId) =>
  instanceCollection.delete(walletId)

const createWalletInstance = (walletInfo) => {
  // create new instance
  const newWalletInstance = networkClasses.createWalletInstance(walletInfo)
  // set instance to collection
  instanceCollection.set(walletInfo.id, newWalletInstance)
}

const updateWalletInstance = (newWalletInfo) => {
  const walletInstance = getWalletInstanceById(newWalletInfo.id)

  if (!walletInstance) {
    debugConsole.warn(
      `Wallet instance does not exist. Wallet keys "${Object.keys(
        newWalletInfo
      )}" have not been updated`
    )
    return
  }

  // to save the instance, because it may be busy performing some function
  merge(walletInstance, newWalletInfo)
}

export default {
  createWalletInstance,
  getWalletInstanceById,
  getWalletInstanceByAddress,
  updateWalletInstance,
  removeWalletInstanceById,
  clearWalletInstances,
}
