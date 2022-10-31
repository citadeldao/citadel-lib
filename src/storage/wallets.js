import state from '../state'
import { checkWalletPK } from '../helpers/checkWalletPK'

const getStorageKey = () => `lib-wallets-${state.getState('user').id}`

const clearCache = () => localStorage.removeItem(getStorageKey())

const getWalletListObject = () => {
  return JSON.parse(localStorage.getItem(getStorageKey())) || {}
}

const setWalletListObject = (walletListObject) => {
  return localStorage.setItem(getStorageKey(), JSON.stringify(walletListObject))
}

const putWallet = (wallet) => {
  if (!wallet.id || !wallet.net || !wallet.address) {
    return
  }
  const walletListObject = getWalletListObject()
  // for security
  checkWalletPK(wallet)
  // add wallet to bject
  walletListObject[wallet.id] = wallet
  // set wallet list
  setWalletListObject(walletListObject)
}

const removeWallet = (id) => {
  // get wallet list
  const walletListObject = getWalletListObject()
  // delete wallet
  delete walletListObject[id]
  // set wallet list
  setWalletListObject(walletListObject)
}

export const wallets = {
  // walletList: { id: wallet }
  getWalletListObject,
  // put new or replace old wallet from walletList object
  putWallet,
  // remove wallet from walletList object
  removeWallet,
  // cleare all lib cache from localStorage
  clearCache,
  getStorageKey,
}
