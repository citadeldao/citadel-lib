import state from '../../../state'

// function returns request parameters for the axios instance.
export const refreshAuthToken = ({ refreshToken }) => ({
  url: `/profile/jwt/refresh?version=${state.getState('backendApiVersion')}`,
  method: 'post',
  data: { refresh_token: refreshToken },
})
