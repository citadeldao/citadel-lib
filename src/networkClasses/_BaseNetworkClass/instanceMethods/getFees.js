import api from '../../../api'

// proxy request to backend
export const getFees = async function (token) {
  const { data } = await api.requests.getFees({
    net: token || this.net,
  })
  return data
}
