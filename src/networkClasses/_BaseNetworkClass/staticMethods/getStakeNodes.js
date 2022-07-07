import api from '../../../api'
import state from '../../../state'
import storage from '../../../storage'
import { CACHE_NAMES } from '../../../constants'
import { debugConsoleLog } from '../../../helpers/debugConsoleLog'

export const getStakeNodes = async function () {
  debugConsoleLog('*getStakeNodes-static network method')
  debugConsoleLog(
    '*getStakeNodes-static state.getState(stakeNodesUpdated)',
    state.getState('stakeNodesUpdated')
  )
  // update cache if old
  if (!state.getState('stakeNodesUpdated')) {
    debugConsoleLog('*getStakeNodes-static  if (!state.getState')
    // load node list
    const { data: stakeList } = await api.requests.getStakeNodes()
    debugConsoleLog('*getStakeNodes-static stakeList', stakeList)
    // update stakeList cache
    storage.caches.setCache(CACHE_NAMES.STAKE_NODES, stakeList)
    debugConsoleLog('*getStakeNodes-static after setCache ')

    // set stakeNodesUpdated flag
    state.setState('stakeNodesUpdated', true)
    debugConsoleLog('*getStakeNodes-static after setState stakeNodesUpdated')
  }
  debugConsoleLog('**getStakeNodes-static after if, befor return getCache')
  // return cache for this net
  return storage.caches.getCache(CACHE_NAMES.STAKE_NODES)[this.net]
}
