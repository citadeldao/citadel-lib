import { getNetworksConfig } from './getNetworksConfig'
import { getWallets } from './getWallets'
import { getInfo } from './getInfo'
import { getDelegationBalance } from './getDelegationBalance'
import { getWalletsDetail } from './getWalletsDetail'
/**
 * FORMATTED REQUEST FUNCTIONS:
 *
 * Wrappers over the backend api with changes that will be transferred to the backend in the future.
 * Replace original request functions in API object
 */
export const formattedRequestFunctions = {
  getNetworksConfig,
  getWallets,
  getInfo,
  getDelegationBalance,
  getWalletsDetail,
}
