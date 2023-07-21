import state from '../../../../state'
import { OUR_TOKEN } from './../../../../constants'

// function returns request parameters for the axios instance.
export const getXctRewards = ({ address }) => {
  return {
    // backend domain is in the axios instance
    // url: `/transactions/bsc_xct/${address}/rewards-claimable`,
    url: `/blockchain/${OUR_TOKEN}/${address}/rewards-claimable`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
