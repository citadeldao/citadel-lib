import api from '../../../../../api'
import storage from '../../../../../storage'
import { CACHE_NAMES } from '../../../../../constants'
import { debugConsole } from '../../../../../helpers/debugConsole'

export const createSnip20TokenListItem = async (
  token,
  amount,
  savedViewingKeys
) => {
  // get secret tokens config
  const tokensConfig = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)
    .secret.tokens
  // get token price
  let price = { USD: 0, BTC: 0 }
  try {
    const { data = { USD: 0, BTC: 0 } } = await api.requests.getCurrency({
      net: token,
    })
    price = data
  } catch (e) {
    // skip error
    debugConsole.error(e)
  }

  return {
    net: tokensConfig[token].net,
    name: tokensConfig[token].name,
    code: tokensConfig[token].code,
    standard: tokensConfig[token].standard,
    savedViewingKey: savedViewingKeys[token],
    tokenBalance: {
      mainBalance: amount,
      calculatedBalance: amount,
      price,
      adding: [],
      delegatedBalance: 0,
      frozenBalance: 0,
      originatedAddresses: [],
      stake: 0,
      unstake: 0,
      linked: true,
      claimableRewards: 0,
    },
  }
}
