import state from '../state'
import { resetApi } from '../api'
import walletInstances from '../walletInstances'
import networks from '../networks'
import storage from '../storage'

export default (clearCache) => {
  clearCache && storage.clearCache()
  try {
    const id = state.getState('user').id
    // remove old db
    indexedDB?.deleteDatabase(`_pouch_wallets_${id}`)
    indexedDB?.deleteDatabase(`_pouch_caches_${id}`)
  } catch {
    false
  }
  networks.unconfigureNetworkClasses()
  walletInstances.clearWalletInstances()
  state.setDefaultState()
  resetApi()
}
