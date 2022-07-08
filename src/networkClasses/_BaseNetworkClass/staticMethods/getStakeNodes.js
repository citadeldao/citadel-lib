import api from '../../../api'
import state from '../../../state'

export const getStakeNodes = async function () {
  // update cache if old
  if (!state.getState('stakeList')) {
    // load node list
    const { data: stakeList } = await api.requests.getStakeNodes()

    // set stakeNodes to the state
    state.setState('stakeList', stakeList)
  }

  // return cache for this net
  return state.getState('stakeList')[this.net]
}
