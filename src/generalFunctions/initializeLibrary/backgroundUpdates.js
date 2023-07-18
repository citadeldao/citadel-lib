import api from '../../api'
import state from '../../state'
import walletsManager from '../../walletsManager'
import walletInstances from '../../walletInstances'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'
import { configureModulesByCaches } from './configureModulesByCaches'
import { getExstensionLocalWallets } from '../../api/extensionRequestsAdapter/_getExstensionLocalWallets'

// update wallets detail
export const backgroundUpdates = async (initialCacheManager) => {
  // update old initial caches
  await initialCacheManager.updateOldCache()

  // configure modules by updated cache and walletList from 'detail' request to fast init
  configureModulesByCaches(initialCacheManager.getInitialCaches())

  // if isExtension
  if (state.getState('isExtension')) {
    // get local wallets from extension store
    const localWallets = await getExstensionLocalWallets()
    // set local wallets with types to lib
    await walletsManager.setWalletList(localWallets)
  } else {
    // get detailed wallet balances
    const { data: detailedAccountwallets } =
      await api.requests.getWalletsDetail()

    // update walletList detail
    await walletsManager.updateWalletList(detailedAccountwallets)

    //get updated walletList
    const walletList = walletsManager.getWalletList()

    // //update subtokensLists
    // await Promise.all(
    //   walletList.map(async (walletInfo) => {
    //     // update all subtokensList
    //     await walletInstances
    //       .getWalletInstanceById(walletInfo.id)
    //       .updateSubtokensList()
    //   })
    // )
    //update subtokensLists for secret snip
    await Promise.all(
      walletList.map(async (walletInfo) => {
        if(walletInfo.net === 'secret'){
          // update all subtokensList
          await walletInstances
          .getWalletInstanceById(walletInfo.id)
          .updateSubtokensList()
        }
      })
    )
  }

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
