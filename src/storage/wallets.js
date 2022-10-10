import state from '../state'
import { checkWalletPK } from '../helpers/checkWalletPK'
import { debugConsole } from '../helpers/debugConsole'

const getStorageKey = () => `lib-wallets-${state.getState('user').id}`

const clearCache = () => localStorage.removeItem(getStorageKey())

const getWalletListObject = () => {
  debugConsole.log('>>> getStorageKey()', getStorageKey())
  debugConsole.log(
    '>>> localStorage.getItem(getStorageKey()))',
    localStorage.getItem(getStorageKey())
  )
  return JSON.parse(localStorage.getItem(getStorageKey())) || {}
}

const setWalletListObject = (walletListObject) => {
  debugConsole.log('>>> setWalletListObject start', walletListObject)
  consdebugConsoleole.log(
    '>>> setWalletListObject getStorageKey()',
    getStorageKey()
  )
  debugConsole.log(
    '>>> JSON.stringify(walletListObject)',
    JSON.stringify(walletListObject)
  )
  return localStorage.setItem(getStorageKey(), JSON.stringify(walletListObject))
}

const putWallet = (wallet) => {
  debugConsole.log('>>> putWallet', wallet)
  if (!wallet.id || !wallet.net || !wallet.address) {
    return
  }
  const walletListObject = getWalletListObject()
  debugConsole.log('>>> putWallet walletListObject', walletListObject)
  // for security
  checkWalletPK(wallet)
  // add wallet to bject
  walletListObject[wallet.id] = wallet
  // set wallet list
  setWalletListObject(walletListObject)
}

const removeWallet = (id) => {
  debugConsole.log('>>> removeWallet id', id)
  // get wallet list
  const walletListObject = getWalletListObject()
  debugConsole.log('>>> removeWallet id', id)
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
}
