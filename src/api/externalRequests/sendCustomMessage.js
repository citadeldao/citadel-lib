import state from '../../state'

// function returns request parameters for the axios instance.
export const sendCustomMessage = ({ token, message, type }) => {
  // get app domain url
  const appURL = state.getState('appURL')
  // Full url for external request (for axios instance without BASE_URL)
  return {
    url: `${appURL}/customMsg?token=${token}`,
    method: 'post',
    data: {
      to: 'app',
      from: 'main-front',
      type,
      toDeviceId: token,
      message,
    },
  }
}
