import api from '../../../api'

// proxy request to backend
export const getCrossNetFees = async function ({netTo}) {
  const { data } = await api.requests.getCrossNetFees({
    netFrom: this.net,
    netTo
  })
  return data
}