import { getInfo } from './getInfo'
import { getNetworksConfig } from './getNetworksConfig'
import { getWallets } from './getWallets'
import { getWalletsDetail } from './getWalletsDetail'
import { getActiveDaoHolders } from './getActiveDaoHolders'
import { subscribeRewards } from './subscribeRewards'
import { getAllCurrencies } from './getAllCurrencies'
import { getAllMarketcaps } from './getAllMarketcaps'
import { getSubscriptions } from './getSubscriptions'
import { manageSubscriptions } from './manageSubscriptions'
import { refreshAuthToken } from './refreshAuthToken'
import { searchExtension } from './searchExtension'
import { getExtensionById } from './getExtensionById'

export const common = {
  getInfo,
  getNetworksConfig,
  getWallets,
  getWalletsDetail,
  getActiveDaoHolders,
  subscribeRewards,
  getAllCurrencies,
  getAllMarketcaps,
  getSubscriptions,
  manageSubscriptions,
  refreshAuthToken,
  searchExtension,
  getExtensionById,
}
