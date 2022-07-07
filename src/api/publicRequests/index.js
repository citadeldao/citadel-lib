import { getAllTokenBalances } from './getAllTokenBalances'
import { getDelegationBalance } from './getDelegationBalance'
import { getStakeList } from './getStakeList'
import { prepareClaim } from './prepareClaim'

/**
 * PUBLIC REQUEST PARAMS
 *
 * Available without authorization
 * Use 'publicBackendUrl'
 */
export const publicRequests = {
  getAllTokenBalances,
  getDelegationBalance,
  getStakeList,
  prepareClaim,
}
