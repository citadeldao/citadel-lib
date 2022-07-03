// if there is no authorizationб , return extension storage wallet
import { getExstensionLocalWallets } from './_getExstensionLocalWallets'
import api from '..'

export const getWalletsDetail = async () => {
  // get wallets from storage
  const wallets = await getExstensionLocalWallets()
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
    data: wallets.map((wallet) => {
      // remove keys with local wallet data
      delete wallet.hashedMnemonic
      delete wallet.publicKey
      delete wallet.type
      // return the cleared wallet
      return wallet
    }),
  }
}
