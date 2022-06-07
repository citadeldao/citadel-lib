import api from '../api'
import walletsManager from '../walletsManager'
import walletInstances from '../walletInstances'
import { dispatchLibEvent } from '../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../constants'
import { configureModulesByCaches } from './configureModulesByCaches'

// update wallets detail
export const backgroundUpdates = async (initialCacheManager) => {
  // update old initial caches
  await initialCacheManager.updateOldCache()

  // configure modules by updated cache and walletList from 'detail' request to fast init
  await configureModulesByCaches(initialCacheManager.getInitialCaches())

  // get detailed wallet balances
  const { data: detailedAccountwallets } =
    await api.formattedApi.getWalletsDetail()

  // update walletList detail
  await walletsManager.updateWalletList(detailedAccountwallets)

  // get updated walletList
  const walletList = walletsManager.getWalletList()

  // update subtokensLists
  await Promise.all(
    walletList.map(async (walletInfo) => {
      // update all subtokensList
      await walletInstances
        .getWalletInstanceById(walletInfo.id)
        .updateSubtokensList()
    })
  )

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
