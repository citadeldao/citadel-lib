import { retryRequestOnError } from '../../helpers/retryRequestOnError'
import api from '../../api'
import state from '../../state'
import storage from '../../storage'
import walletInstances from '../../walletInstances'
import { getWalletInfoById } from '../getWalletInfoById'
import { updateSubtokens } from './updateSubtokens'

export const addNewWallet = async ({
  addToAccount,
  createdWallet,
  loadBalance,
  updateSubtokensList,
  title,
}) => {
  // ADD WALLET TO ACCOUNT (skip if the wallet came from "info" or "detail" account wallet list)
  if (addToAccount) {
    const { data: id } = await retryRequestOnError(
      () =>
        api.requests.addWallet({
          net: createdWallet.net,
          address: createdWallet.address,
          title,
        }),
      { retryDelay: 2000, retryCount: 1 }
    )
    // set walletId
    createdWallet.id = id
    // set title
    createdWallet.title = title
  }

  // LOAD BALANCE (not for extension, skip if the wallet came from "info" or "detail" account wallet list)
  if (!state.getState('isExtension') && loadBalance) {
    // load balance
    try {
      const { data: balance } = await api.requests.getDelegationBalance({
        net: createdWallet.net,
        address: createdWallet.address,
      })
      // set balance
      createdWallet.balance = balance
    } catch {
      // set balance to 0
      createdWallet.balance = {
        mainBalance: 0,
        calculatedBalance: 0,
      }
    }
  }

  // ADD TO STORAGE WALLET LIST
  storage.wallets.putWallet(createdWallet)

  // CREATE WALLET INSTANCE
  walletInstances.createWalletInstance(createdWallet)

  // SET SUBTOKEN LIST (do not await subtokens)
  !state.getState('isExtension') &&
    updateSubtokensList &&
    updateSubtokens(createdWallet.id)

  // get wallet from storage (with subtokesList)
  const newWallet = getWalletInfoById(createdWallet.id)

  return newWallet
}
