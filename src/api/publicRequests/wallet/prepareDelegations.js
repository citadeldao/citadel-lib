import state from '../../../state'
// multi stake
// function returns request parameters for the axios instance.
export const prepareDelegations = ({
  net,
  from,
  delegations,
  publicKey,
  isTyped,
}) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${net}/${from}/builder/delegations?version=${state.getState(
      'backendApiVersion'
    )}`,
    method: 'get',
    data: {
      params: {
        delegations,
        publicKey,
        isTyped,
      }
    },
  }
}
