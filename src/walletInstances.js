import networkClasses from './networkClasses'
import { merge } from './helpers/merge'

const instanceCollection = new Map()

const clearWalletInstances = () => instanceCollection.clear()

const getWalletInstanceById = (walletId) => instanceCollection.get(walletId)

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
    console.warn(
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
  updateWalletInstance,
  removeWalletInstanceById,
  clearWalletInstances,
}
