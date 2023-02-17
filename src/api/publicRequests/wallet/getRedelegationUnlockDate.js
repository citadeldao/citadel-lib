import state from '../../../state'

// function returns request parameters for the axios instance.
export const getRedelegationUnlockDate = ({ net, address }) => {
  return {
    // backend domain is in the axios instance
    // url: `/transactions/${net}/${address}/redelegation-unlock-date`,
    url: `/blockchain/${net}/${address}/redelegation-unlock-date`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}