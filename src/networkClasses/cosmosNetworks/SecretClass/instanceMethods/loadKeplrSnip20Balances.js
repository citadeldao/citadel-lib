import networkClasses from '../../..'
import { VIEWING_KEYS_TYPES, LIB_EVENT_NAMES } from '../../../../constants'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'

export async function loadKeplrSnip20Balances() {
  const tokensConfig = networkClasses.getNetworkClass(this.net).tokens
  let updateClientWalletList = false
  let keplrRejected
  // try to get keplr key for every snip20 tokens
  for (const token in tokensConfig) {
    // skip
    if (
      // not snip20 tokens
      tokensConfig[token]?.standard !== 'snip20' ||
      // if viewingKey already saved
      this.savedViewingKeys[token] ||
      // if keplr rejected
      keplrRejected
    ) {
      continue
    }
    try {
      // get VK from keplr
      const keplrViewingKey = await this.getViewingKeyByKeplr(token)
      if (!keplrViewingKey) {
        continue
      }
      updateClientWalletList = true
      // load balance
      await this.loadSnip20TokenBalance(
        token,
        keplrViewingKey,
        VIEWING_KEYS_TYPES.CUSTOM
      )
    } catch (error) {
      keplrRejected = true
      // skip all errors (front is already throwing an error)
      false
      // // throw only change account error
      // if (error.code === 1) {
      //   throw error
      // }
    }
  }

  // EVENT: inform the client that it is time to update wallet list
  updateClientWalletList &&
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
