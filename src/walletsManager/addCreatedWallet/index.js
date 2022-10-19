import { getWalletInfoByAddress } from '../getWalletInfoByAddress'
import { addExistingWallet } from './addExistingWallet.js'
import { addNewWallet } from './addNewWallet.js'

// It is expected that the wallet was previously created by one of the 'create...' lib methods
// network config fields already added in create method: code, networkName etc
export const addCreatedWallet = async ({
  createdWallet,
  title = '',
  // for add wallet from account list (info / detail), then createdWallet already has balance, title and id
  addToAccount = true,
  loadBalance = true,
  updateSubtokensList = true,
}) => {
  // CHECK WALLET EXISTENCE IN STORAGE
  const existingWallet = getWalletInfoByAddress(
    createdWallet.net,
    createdWallet.address
  )

  // FOR EXISTING WALLET
  if (existingWallet) {
    return await addExistingWallet({
      createdWallet,
      existingWallet,
      updateSubtokensList,
    })
  }

  // FOR NEW WALLET
  return await addNewWallet({
    addToAccount,
    createdWallet,
    loadBalance,
    updateSubtokensList,
    title,
  })
}
