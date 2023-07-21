import state from '../../../../state'
import { OUR_TOKEN } from './../../../../constants'

// function returns request parameters for the axios instance.
export const claimAllRewards = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `blockchain/${OUR_TOKEN}/${address}/builder/claim_all_rewards`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
