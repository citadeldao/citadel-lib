import { generateMnemonic } from './generateMnemonic'
import { getSupportedNetworkKeys } from './getSupportedNetworkKeys'
import { init } from './init'
import { reset } from './reset'
import { getAllNetworksConfig } from './getAllNetworksConfig'
import { getAllMarketcaps } from './getAllMarketcaps'
import { getAllRates } from './getAllRates'
import { checkTrezorConnect } from './checkTrezorConnect'
import { getAllRewards } from './getAllRewards'
import { getRewards } from './getRewards'
import { getRewardsByRange } from './getRewardsByRange'
import { getBalanceHistory } from './getBalanceHistory'
import { getGraphRewardsSummary } from './getGraphRewardsSummary'
import { subscribeRewards } from './subscribeRewards'
import { getBalanceFund } from './getBalanceFund'
import { getPreparePrivateClaim } from './getPreparePrivateClaim'
import { getPrepareTransferFund } from './getPrepareTransferFund'
import { getPrivateSale } from './getPrivateSale'
import { addEventListener } from './addEventListener'
import { getSubscriptions } from './getSubscriptions'
import { manageSubscriptions } from './manageSubscriptions'
// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import { sendAssignToDaoMessage } from './sendAssignToDaoMessage'
import { prettyNumber } from './prettyNumber'

export const general = {
  generateMnemonic,
  getSupportedNetworkKeys,
  init,
  reset,
  getAllNetworksConfig,
  getAllMarketcaps,
  getAllRates,
  checkTrezorConnect,
  getAllRewards,
  getRewards,
  getRewardsByRange,
  getBalanceHistory,
  getGraphRewardsSummary,
  subscribeRewards,
  getBalanceFund,
  getPreparePrivateClaim,
  getPrepareTransferFund,
  getPrivateSale,
  sendAssignToDaoMessage,
  addEventListener,
  getSubscriptions,
  manageSubscriptions,
  prettyNumber,
}
