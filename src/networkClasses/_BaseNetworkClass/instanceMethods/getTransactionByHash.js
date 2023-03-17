import api from '../../../api'
import { retryRequestOnError } from '../../../helpers/retryRequestOnError.js'

// proxy request to backend (with retry on error)
export const getTransactionByHash = async function ({ hash } = {}) {
  const { data } = await retryRequestOnError(
    () =>
      api.requests.getTransactionByHash({
        net: this.net,
        address: this.address,
        hash
      }),
    {
      retryDelay: 3000,
      retryCount: 1,
      retryableErrorStatusFrom: 429,
      retryableErrorStatusTo: 429,
    }
  )
  return data
}