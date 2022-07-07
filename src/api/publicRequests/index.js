import { getAllTokenBalances } from './getAllTokenBalances'
import { getDelegationBalance } from './getDelegationBalance'
import { getStakeList } from './getStakeList'
import { prepareClaim } from './prepareClaim'
import { faucetSignUp } from './faucetSignUp'
import { prepareTransfer } from './prepareTransfer'

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
  faucetSignUp,
  prepareTransfer,
}
