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
    url: `/transactions/${net}/${from}/prepare-delegation`,
    method: 'post',
    data: {
      toAddress,
      publicKey,
      amount,
      kt,
      version: state.getState('backendApiVersion'),
    },
  }
}
