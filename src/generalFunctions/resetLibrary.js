import state from '../state'
import { resetApi } from '../api'
import walletInstances from '../walletInstances'
import networkClasses from '../networkClasses'
import socketManager from '../socketManager'
import storage from '../storage'

/********************** RESET LIBRARY ***********************
 * Returns the library to its original state
 **********************************************************/
export const resetLibrary = async (clearCache, userId) => {
  // disconnect sockets
  await socketManager.reset()
  // clear walletInstances
  walletInstances.clearWalletInstances()
  userId && state.setState('user', { id: userId })
  // clear storage
  clearCache && storage.clearCache()
  // clear static network classes properties (with configs)
  networkClasses.unconfigure()
  // cleare state
  state.setDefaultState()
  // cleare api object
  resetApi()
}
