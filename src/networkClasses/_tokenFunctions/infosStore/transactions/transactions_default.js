import api from '../../../../api'
import { retryRequestOnError } from '../../../../helpers/retryRequestOnError'

export async function transactions_default({ token, page, pageSize }) {
  // retry requext on 429 error
  const { data } = await retryRequestOnError(
    () =>
      api.requests.getWalletTransactions({
        net: token,
        address: this.address,
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
