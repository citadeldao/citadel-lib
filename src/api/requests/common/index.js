import { getInfo } from './getInfo'
import { getNetworksConfig } from './getNetworksConfig'
import { getSubtokensConfigByNet } from './getSubtokensConfigByNet'
//TODO GRISH
import { getNewNetworksConfig } from './getNewNetworksConfig'
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
import { getExtensionTokenAuth } from './getExtensionTokenAuth'


export const common = {
  getInfo,
  getNetworksConfig,
  getSubtokensConfigByNet,
  //TODO GRISH
  getNewNetworksConfig,
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
  getExtensionTokenAuth
}
