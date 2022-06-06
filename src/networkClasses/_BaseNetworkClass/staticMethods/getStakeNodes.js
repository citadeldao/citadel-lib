import api from '../../../api'
import state from '../../../state'
import storage from '../../../storage'
import { CACHE_NAMES } from '../../../constants'

export const getStakeNodes = async function () {
  // update cache if old
  if (!state.getState('stakeNodesUpdated')) {
    // load node list
    const { data: stakeList } = await api.requests.getStakeNodes()
    // update stakeList cache
    storage.caches.setCache(CACHE_NAMES.STAKE_NODES, stakeList)
    // set stakeNodesUpdated flag
    state.setState('stakeNodesUpdated', true)
  }
  // return cache for this net
  return storage.caches.getCache(CACHE_NAMES.STAKE_NODES)[this.net]
}
