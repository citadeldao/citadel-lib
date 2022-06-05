import state from '../state'
import walletInstances from '../walletInstances'
import libCore from '../libCore'
import { merge } from '../helpers/merge'
import { EVENT_NAMES } from '../constants'

const getStorageKey = () => `lib-wallets-${state.getState('user').id}`

const clearCache = () => localStorage.removeItem(getStorageKey())

const getWalletListObject = () =>
  JSON.parse(localStorage.getItem(getStorageKey())) || {}
const getWalletList = () => Object.values(getWalletListObject())

const setWalletList = (walletList) =>
  localStorage.setItem(getStorageKey(), JSON.stringify(walletList))

const getWalletByAddress = (net, address) =>
  getWalletList().find(
    ({ net: walletNet, address: walletAddress }) =>
      walletNet === net && walletAddress === address
  )

const getWalletById = (id) => getWalletListObject()[id]

const putWallet = (wallet) => {
  const walletList = getWalletListObject()
  // add wallet to bject
  walletList[wallet.id] = wallet
  // set wallet list
  setWalletList(walletList)
  // update wallet instance
  walletInstances.updateWalletInstance(wallet)
  // dispatch Lib Event
  libCore.dispatchLibEvent(EVENT_NAMES.walletListUpdated)
}

const removeWallet = (id) => {
  // get wallet list
  const walletList = getWalletListObject()
  // delete wallet
  delete walletList[id]
  // set wallet list
  setWalletList(walletList)
  // remove walletInstance
  walletInstances.removeWalletInstanceById(id)
}

const updateWallet = ({
  walletId,
  newWalletInfo,
  method = 'shallow-merge',
}) => {
  let wallet = getWalletListObject()[walletId]
  // return if wallet not exist to prevent errors
  if (!wallet) {
    return
  }

  if (method === 'shallow-merge') {
    // by default
    wallet = { ...wallet, ...newWalletInfo }
  } else if (method === 'deep-merge') {
    // for deep merge (but replace arrays)
    merge(wallet, newWalletInfo)
  } else if (method === 'replace') {
    // clean old wallet
    wallet = {
      // set required fields just in case
      id: walletId,
      net: wallet.net,
      address: wallet.address,
      ...newWalletInfo,
    }
  }

  putWallet(wallet)

  // return updated wallet
  return wallet
}

export const wallets = {
  getWalletByAddress,
  getWalletById,
  getWalletList,
  putWallet,
  removeWallet,
  updateWallet,
  clearCache,
}
