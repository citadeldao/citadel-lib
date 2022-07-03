import { getAllTokenBalances } from './getAllTokenBalances'
import { getDelegationBalance } from './getDelegationBalance'

/**
 * PUBLIC REQUEST PARAMS
 *
 * Available without authorization
 * Use 'publicBackendUrl'
 */
export const publicRequests = {
  getAllTokenBalances,
  getDelegationBalance,
}
