import api from '../..'

export const getInfo = async () => {
  const { data: currency } = await api.requests.getAllCurrencies()
  const { data: marketcap } = await api.requests.getAllMarketcaps()
  // читать из localstorage
  const wallets = []
  console.log('currency', currency)
  console.log('marketcap', marketcap)
  return {
    id: 'extension',
    marketcap,
    currency,
    wallets,
    login: 'unauthorised',
    subscribe_rewards: false,
  }
}
