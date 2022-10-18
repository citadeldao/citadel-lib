import state from '../../../state'

// function returns request parameters for the axios instance.
export const manageSubscriptions = (newValue) => ({
  url: `/email/subscriptions`,
  method: 'post',
  data: { ...newValue, version: state.getState('backendApiVersion') },
})
