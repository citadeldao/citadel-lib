import { BaseCosmosNetwork } from '../../_BaseCosmosClass'
import storage from '../../../../storage'
import { CACHE_NAMES } from '../../../../constants'

// proxy request to backend
export const getFees = async function (token) {
  // get secret tokens config
  const tokensConfig = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)
    .secret.tokens
  // for snip 20 special fee
  if (tokensConfig[token]?.standard === 'snip20') {
    return {
      low: {
        fee: 0.004,
      },
      medium: {
        fee: 0.006,
      },
      high: {
        fee: 0.008,
      },
    }
  }
  // instead "super"
  return await BaseCosmosNetwork.prototype.getFees.call(this, token)
}
