import state from '../../../state'
// single stake
// function returns request parameters for the axios instance.
export const prepareDelegation = ({
  net,
  from,
  toAddress,
  publicKey,
  amount,
  kt,
}) => {
  return {
    // backend domain is in the axios instance
    // url: `/transactions/${net}/${from}/prepare-delegation?version=${state.getState(
    //   'backendApiVersion'
    // )}`,
    url: `/blockchain/${encodeURIComponent(net)}/${from}/builder/delegation?version=${state.getState(
      'backendApiVersion'
    )}`,
    method: 'get',
    data: {
      params: {
        toAddress,
        publicKey,
        amount,
        kt,
      }
    },
  }
}
