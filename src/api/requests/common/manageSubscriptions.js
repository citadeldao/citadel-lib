import state from '../../../state'

// function returns request parameters for the axios instance.
export const manageSubscriptions = (newValue) => ({
  url: `/email/subscriptions?version=${state.getState('backendApiVersion')}`,
  method: 'post',
  data: newValue,
})
