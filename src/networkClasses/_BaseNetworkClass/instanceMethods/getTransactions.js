import api from '../../../api'
import { retryRequestOnError } from '../../../helpers/retryRequestOnError.js'

// proxy request to backend (with retry on error)
export const getTransactions = async function ({ page, pageSize, kt } = {}) {
  const { data } = await retryRequestOnError(
    () =>
      api.requests.getWalletTransactions({
        net: this.net,
        address: kt || this.address,
        params: {
          page,
          pageSize,
        },
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
