import { setWalletList } from './setWalletList'
import { addCreatedWallet } from './addCreatedWallet'
import { updateWalletList } from './updateWalletList'
import { removeWallet } from './removeWallet'
import { updateWallet } from './updateWallet'
import { getWalletInfoByAddress } from './getWalletInfoByAddress'
import { getWalletInfoById } from './getWalletInfoById'
import { getWalletList } from './getWalletList'

/***************** WALLETS MANAGER MODULE *****************
 * Removing, adding, updating wallets. 
 * Updates data in the local storage, wallet instances.
 *
 * HOW TO USE:
 * // update wallet balance
 *  walletsManager.updateWallet({
      walletId,
      newWalletInfo: { balance },
    })
 **********************************************************/

export default {
  setWalletList,
  addCreatedWallet,
  updateWalletList,
  removeWallet,
  updateWallet,
  getWalletInfoByAddress,
  getWalletInfoById,
  getWalletList,
}
