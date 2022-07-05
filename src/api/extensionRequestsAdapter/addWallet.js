import state from '../../state'
import { wallet } from '../requests/wallet'
import { getExstensionLocalWallets } from './_getExstensionLocalWallets'

// function should return wallet id
export const addWallet = async (data) => {
  // get storageWalletList
  const localWallets = await getExstensionLocalWallets()

  // if local wallet exist
  const existingWallet = localWallets.find(
    ({ address, net }) => address === data.address && net === wallet.net
  )

  if (existingWallet) {
    return { data: existingWallet.id }
  }

  // find max id
  const maxLocalWaletsId = Math.max(
    ...localWallets.map(({ id }) => +id).filter((id) => id)
  )

  // get maximum index of the created wallet (relevant when adding an array of wallets)
  const maxCreatedId = state.getState('maxExtesionCreatedId')

  // create walletId
  const walletId =
    maxCreatedId > maxLocalWaletsId ? maxCreatedId + 1 : maxLocalWaletsId + 1

  // get maximum index of the created wallet (relevant when adding an array of wallets)
  state.setState('maxExtesionCreatedId', walletId)

  // return walletId as String
  return {
    data: `${walletId}`,
  }
}
