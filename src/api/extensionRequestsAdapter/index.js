import { getInfo } from './getInfo'
import { getDaoSupportedNetworks } from './getDaoSupportedNetworks'
import { getWalletsDetail } from './getWalletsDetail'
import { getDelegationBalance } from './getDelegationBalance'
import { getAllTokenBalances } from './getAllTokenBalances'
/**
 * REQUEST FUNCTIONS FOR EXTENSION:
 *
 * Replace original request functions in API object (to work without authorization)
 */
export const extensionRequestsAdapter = {
  getInfo,
  getDaoSupportedNetworks,
  getWalletsDetail,
  getDelegationBalance,
  getAllTokenBalances,
}
