import {
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
  VIEWING_KEYS_TYPES,
  WALLET_TYPES,
} from '../../../../constants'
import snip20Manager from '../snip20Manager'
import networkClasses from '../../..'

export async function getPossibleViewingKeyForCheck(token) {
  let viewingKey = null
  let viewingKeyType = null
  let error = null

  // SIMPLE VK
  if (
    PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(this.type) &&
    this.privateKeyHash
  ) {
    viewingKey = await snip20Manager.generateSimpleViewingKey(
      networkClasses.getNetworkClass(this.net).tokens[token].address,
      this.privateKeyHash
    )
    viewingKeyType = VIEWING_KEYS_TYPES.SIMPLE
  }
  // KEPLR VK
  if (this.type === WALLET_TYPES.KEPLR) {
    try {
      viewingKey = await this.getViewingKeyByKeplr(token)
      viewingKeyType = VIEWING_KEYS_TYPES.CUSTOM
    } catch (catchedError) {
      // skip all keplr errors
      error = catchedError
    }
  }

  return { viewingKey, viewingKeyType, error }
}
