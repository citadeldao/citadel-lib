import { additionalConfig } from './_hardCode'
import { merge } from '../../helpers/merge'
import { requests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'
import storage from '../../storage'
import { CACHE_NAMES } from '../../constants'

// modify the backend response (will move to the backend in the future)
export const getNetworksConfig = async () => {
  const backendUrl = state.getState('backendUrl')
  // create original axios function
  const originalRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getNetworksConfig,
    enableResponseHandler: true,
  })

  // get original response
  const networksConfig = await originalRequest()

  // add hardcode configs
  additionalConfig.map(({ net, config }) => {
    merge(networksConfig[net], config)
  })

  // add hasTransactionComment true for all tokens except snip20
  Object.entries(networksConfig).map(([net, { tokens }]) => {
    networksConfig[net].unstakeingPerioud = storage.caches.getCache(CACHE_NAMES.MARKETCAPS)[net]?.unbondingPeriod || 0
    if (tokens && Object.keys(tokens).length) {
      Object.entries(tokens).map(([token, { standard }]) => {
        if (standard === 'snip20') {
          networksConfig[net].tokens[token].hasTransactionComment = false
        } else {
          networksConfig[net].tokens[token].hasTransactionComment = true
        }
      })
    }
  })

  return networksConfig
}
