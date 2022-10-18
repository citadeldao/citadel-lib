import state from '../../../state'

// function returns request parameters for the axios instance.
export const prepareClaim = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${data.net}/${data.address}/prepare-claim-reward`,
    method: 'post',
    data: {
      isTyped: data?.isTyped,
      version: state.getState('backendApiVersion'),
    },
  }
}
