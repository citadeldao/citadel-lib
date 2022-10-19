import { updateSubtokens } from './updateSubtokens'
import { SECRET_NET_KEY } from '../../constants'
import { updateWallet } from '../updateWallet'

// update existing wallet function
export const updateExistingWallet = ({
  existingWallet,
  createdWallet,
  updateSubtokensList,
}) => {
  // for publicKey -> other type adding case
  const hasPrivateSubtokensNets = [SECRET_NET_KEY]
  // rewrite any others types and return updated wallet
  const updatedWallet = updateWallet({
    walletId: existingWallet.id,
    newWalletInfo: createdWallet,
  })

  // update subtokens for secret wallet (do not await)
  hasPrivateSubtokensNets.includes(existingWallet.net) &&
    updateSubtokensList &&
    updateSubtokens(existingWallet.id)

  // return updated wallet
  return updatedWallet
}
