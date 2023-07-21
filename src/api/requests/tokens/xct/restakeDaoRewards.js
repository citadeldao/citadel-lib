import state from '../../../../state'
import { OUR_TOKEN } from './../../../../constants'

// function returns request parameters for the axios instance.
export const restakeDaoRewards = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `blockchain/${OUR_TOKEN}/${address}/builder/restake_staking_rewards`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
