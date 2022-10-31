import { LIB_EVENT_NAMES } from '../../../constants'
import storage from '../../../storage'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import walletInstances from '../../../walletInstances'

export const storageChangedExternally = () => {
  // detect changes from another tab
  addEventListener('storage', async ({ key }) => {
    // current walletList only
    if (key === storage.wallets.getStorageKey()) {
      await walletInstances.syncWalletInstancesWithStorage()
    }
    dispatchLibEvent(LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY)
  })
}
