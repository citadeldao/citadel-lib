import state from '../state'
import { resetApi } from '../api'
import walletInstances from '../walletInstances'
import networkClasses from '../networkClasses'
import socketManager from '../socketManager'
import storage from '../storage'

export const resetLibrary = async (clearCache) => {
  // disconnect sockets
  await socketManager.reset()
  // clear walletInstances
  walletInstances.clearWalletInstances()
  // clear storage
  clearCache && storage.clearCache()
  // clear static network classes properties (with configs)
  networkClasses.unconfigure()
  // cleare state
  state.setDefaultState()
  // cleare api object
  resetApi()
}
