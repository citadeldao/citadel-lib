// function returns request parameters for the axios instance.
export const refreshAuthToken = ({ refreshToken }) => ({
  url: `/profile/subscribe/rewards`,
  method: 'post',
  data: { refresh_token: refreshToken },
})
