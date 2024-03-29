import state from '../../../state'

// function returns request parameters for the axios instance.
export const getSubscriptions = () => ({
  url: `/email/subscriptions`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
