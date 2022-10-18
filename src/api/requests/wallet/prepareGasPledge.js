import state from '../../../state'
// function returns request parameters for the axios instance.
export const prepareGasPledge = ({
  net,
  address,
  publicKey,
  toAddress,
  amount,
}) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${address}/prepare-pledge?version=${state.getState('backendApiVersion')}`,
    method: 'post',
    data: {
      publicKey,
      toAddress,
      amount,
    },
  }
}
