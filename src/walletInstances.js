import networks from './networks'
import { WALLET_TYPES } from './constants'
import { merge } from './helpers/merge'

const instanceCollection = new Map()

const clearWalletInstances = () => instanceCollection.clear()

const getWalletInstanceById = (walletId) => instanceCollection.get(walletId)

const removeWalletInstanceById = (walletId) =>
  instanceCollection.delete(walletId)

const setWalletInstanceById = (walletId, instance) =>
  instanceCollection.set(walletId, instance)

const updateWalletInstance = (newWalletInfo) => {
  // wallet instances should reflect the current state of the wallet storage. Any change in the state of the wallet (list of wallets) - updated data from the server, e.g. - is first written to the storage, and then the callback from the storage updates the list of instances

  const walletInstance = getWalletInstanceById(newWalletInfo.id)
  // CASE 2: existing wallet instance needs an update
  if (walletInstance) {
    const initInstanceRequired =
      walletInstance.type === WALLET_TYPES.PUBLIC_KEY &&
      newWalletInfo.type !== WALLET_TYPES.PUBLIC_KEY
    // для сохранения инстанса, т.к он может быть занят выполнением какой-либо функции
    merge(walletInstance, newWalletInfo)
    initInstanceRequired && walletInstance.init()
    return
  }

  // CASE 3: wallet instance not exist
  const newWalletInstance = networks.createWalletInstance(newWalletInfo)
  setWalletInstanceById(newWalletInfo.id, newWalletInstance)
  // init instance (update secret viewingKey etc, without awaiting)
  newWalletInstance.init()
}

export default {
  clearWalletInstances,
  getWalletInstanceById,
  removeWalletInstanceById,
  setWalletInstanceById,
  updateWalletInstance,
}
