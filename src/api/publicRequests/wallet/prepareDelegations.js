import state from '../../../state'
const qs = require('qs')
// multi stake
// function returns request parameters for the axios instance.
export const prepareDelegations = ({
  net,
  from,
  delegations,
  publicKey,
  stakeAccount,
  isTyped,
}) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/${from}/builder/delegations?version=${state.getState(
      'backendApiVersion'
    )}`,
    method: 'get',
    data: {
      params: {
        delegations,
        publicKey,
        stakeAccount,
        isTyped,
      },
      // for passing array in request params
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    },
  }
}
