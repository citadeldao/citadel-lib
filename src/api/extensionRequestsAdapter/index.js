import { getInfo } from './getInfo'
import { getDaoSupportedNetworks } from './getDaoSupportedNetworks'
import { getWalletsDetail } from './getWalletsDetail'
import { getDelegationBalance } from './getDelegationBalance'
import { addWallet } from './addWallet'
import { removeWallet } from './removeWallet'

// import { getAllTokenBalances } from './getAllTokenBalances'
// import { faucetSignUp } from './faucetSignUp'
// import { checkTransaction } from './checkTransaction'
// import { getStakeList } from './getStakeList'
// import { prepareClaim } from './prepareClaim'
// import { prepareTransfer } from './prepareTransfer'
// import { sendSignedTransaction } from './sendSignedTransaction'
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
  addWallet,
  removeWallet,
  
  // getAllTokenBalances,
  // faucetSignUp,
  // checkTransaction,
  // getStakeList,
  // prepareClaim,
  // prepareTransfer,
  // sendSignedTransaction,
}
