import networkClasses from '../../..'
import { VIEWING_KEYS_TYPES } from '../../../../constants'

export async function loadKeplrSnip20Balances() {
  const tokensConfig = networkClasses.getNetworkClass(this.net).tokens

  // try to get keplr key for every snip20 tokens
  for (const token in tokensConfig) {
    // skip
    if (
      // not snip20 tokens
      tokensConfig[token]?.standard !== 'snip20' ||
      // if viewingKey already saved
      this.savedViewingKeys[token]
    ) {
      continue
    }
    try {
      // get VK from keplr
      const keplrViewingKey = await this.getViewingKeyByKeplr(token)
      if (!keplrViewingKey) {
        continue
      }
      // load balance
      await this.loadSnip20TokenBalance(
        token,
        keplrViewingKey,
        VIEWING_KEYS_TYPES.CUSTOM
      )
    } catch (error) {
      //skip all errors (front is already throwing an error)
      // // throw only change account error
      // if (error.code === 1) {
      //   throw error
      // }
    }
  }
}
