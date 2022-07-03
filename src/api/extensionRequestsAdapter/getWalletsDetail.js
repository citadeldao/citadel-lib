// if there is no authorizationб , return extension storage wallet
import { prepareAccountWallets } from './_prepareAccountWallets'
import api from '..'

export const getWalletsDetail = async () => {
  // get wallets from storage
  const wallets = await prepareAccountWallets()
  // update balances for each wallet
  await Promise.all(
    wallets.map(async (wallet) => {
      try {
        const { data: balance } = await api.requests.getDelegationBalance({
          address: wallet.address,
          net: wallet.net,
        })
        // update balance
        wallet.balance = balance
      } catch {
        return
      }
    })
  )

  return {
    data: wallets,
  }
}
