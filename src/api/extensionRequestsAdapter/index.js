import { getInfo } from './getInfo'
import { getDaoSupportedNetworks } from './getDaoSupportedNetworks'
import { getWalletsDetail } from './getWalletsDetail'
import { getDelegationBalance } from './getDelegationBalance'
import { getAllTokenBalances } from './getAllTokenBalances'
import { addWallet } from './addWallet'
import { removeWallet } from './removeWallet'
import { faucetSignUp } from './faucetSignUp'
import { checkTransaction } from './checkTransaction'
import { getStakeList } from './getStakeList'
import { prepareClaim } from './prepareClaim'
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
  addWallet,
  removeWallet,
  faucetSignUp,
  checkTransaction,
  getStakeList,
  prepareClaim
}
