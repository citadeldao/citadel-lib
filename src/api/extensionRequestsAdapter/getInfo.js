import api from '../'
import { prepareAccountWallets } from './_prepareAccountWallets'

// if there is no authorization, collect the request for info in parts
export const getInfo = async () => {
  // get currencies
  const { data: currency } = await api.requests.getAllCurrencies()
  // get marketcaps
  const { data: marketcap } = await api.requests.getAllMarketcaps()
  // read wallets from extension localStorage
  const wallets = await prepareAccountWallets()
  return {
    data: {
      marketcap,
      currency,
      wallets,
      // hardcode account info (id used for cache name)
      id: 'extension',
      login: 'unauthorised',
      subscribe_rewards: false,
    },
  }
}
