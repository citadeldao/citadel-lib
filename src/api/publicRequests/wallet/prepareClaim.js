import state from '../../../state'

// function returns request parameters for the axios instance.
export const prepareClaim = (data) => {
  return {
    // backend domain is in the axios instance
    // url: `/transactions/${data.net}/${
    //   data.address
    // }/prepare-claim-reward?version=${state.getState('backendApiVersion')}`,
    url:`/blockchain/${data.net}/${data.address}/builder/claim-reward?version=${state.getState('backendApiVersion')}`,
    method: 'get',
    data: {
      params:{
        isTyped: data?.isTyped,
      }
    },
  }
}
