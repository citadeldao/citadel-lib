import api from '../'
import { getExstensionLocalWallets } from './_getExstensionLocalWallets'

// if there is no authorization, collect the request for info in parts
export const getInfo = async () => {
  // get currencies
  const { data: currency } = await api.requests.getAllCurrencies()
  // get marketcaps
  const { data: marketcap } = await api.requests.getAllMarketcaps()
  // read wallets from extension localStorage
  const wallets = await getExstensionLocalWallets()
  return {
    data: {
      marketcap,
      currency,
      wallets: wallets.map((wallet) => {
        // remove keys with local wallet data
        delete wallet.hashedMnemonic
        delete wallet.publicKey
        delete wallet.type
        // return the cleared wallet
        return wallet
      }),
      // hardcode account info (id used for cache name)
      id: 'extension',
      login: 'unauthorised',
      subscribe_rewards: false,
    },
  }
}
