import state from '../../../state'
// function returns request parameters for the axios instance.
export const prepareGasUnpledge = ({
  net,
  address,
  publicKey,
  toAddress,
  amount,
}) => {
  return {
    // backend domain is in the axios instance
    // url: `/transactions/${net}/${address}/prepare-unpledge?version=${state.getState('backendApiVersion')}`,
    url: `/blockchain/${encodeURIComponent(net)}/${address}/builder/unpledge?version=${state.getState('backendApiVersion')}`,
    method: 'get',
    data: {
      params:{
        publicKey,
        toAddress,
        amount,
      }
      
    },
  }
}
