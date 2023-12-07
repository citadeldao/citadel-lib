import api from '../../api'

export const getAllTokensByNet = async ({ net }) => {
  // call api
  const { tokens } = await api.requests.getAllTokensByNet({ net })
  return tokens
}
