import state from '../../../state'

// function returns request parameters for the axios instance.
export const refreshAuthToken = ({ refreshToken }) => ({
  url: `/profile/jwt/refresh`,
  method: 'post',
  data: {
    refresh_token: refreshToken,
    version: state.getState('backendApiVersion'),
  },
})
