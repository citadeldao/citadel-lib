import { VIEWING_KEYS_TYPES, WALLET_TYPES } from '../../../../constants'
import walletInstances from '../../../../walletInstances'
import snip20Manager from '../snip20Manager'
import storage from '../../../../storage'
import { CACHE_NAMES } from '../../../../constants'

// TODO: refact!
export async function checkSavedAndSimpleVKValidity() {
  // get secret tokens config
  const tokensConfig = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)
    .secret.tokens

  // public wallet does not have viewing keys
  if (this.type === WALLET_TYPES.PUBLIC_KEY) return

  // collect changed tokens names (TODO: refact)
  const chagedViewingKeyTokens = []

  // 1) check saved ViewingKey (do not use Promise.all because 429 cosmWasm error - too many requests)
  for (const token in this.savedViewingKeys) {
    // checking that the wallet was not deleted
    if (!walletInstances.getWalletInstanceById(this.id)) continue

    // skip if token no longer exists in neworks.json
    if (!tokensConfig[token]) continue

    // get viewing key and its type from savedViewingKeys
    const { viewingKey, viewingKeyType } = this.savedViewingKeys[token] || {}

    // skip favorite for next - SVK check - loop
    if (
      tokensConfig[token].favorite &&
      viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE
    )
      continue

    // check token viewing key validity (using a balance request)
    const { error } = await snip20Manager.getTokenBalance(
      this.address,
      tokensConfig[token].address,
      tokensConfig[token].decimals,
      viewingKey
    )

    if (error) {
      chagedViewingKeyTokens.push(token)
      this._saveViewingKeyToInstance(token, null)
    }
  }

  // 2) check simpleViewingKey for favorite vallets
  for (const token in tokensConfig) {
    // checking that the wallet was not deleted

    if (!walletInstances.getWalletInstanceById(this.id)) continue
    const { favorite } = tokensConfig[token]
    if (!favorite) continue
    const { viewingKeyType } = this.savedViewingKeys[token] || {}
    // skip already checked VK:
    if (viewingKeyType === VIEWING_KEYS_TYPES.CUSTOM) continue
    const simpleViewingKey = snip20Manager.generateSimpleViewingKey(
      tokensConfig[token].address,
      this.privateKeyHash
    )
    const { error } = await snip20Manager.getTokenBalance(
      this.address,
      tokensConfig[token].address,
      tokensConfig[token].decimals,
      simpleViewingKey
    )
    if (!error) {
      chagedViewingKeyTokens.push(token)
      this._saveViewingKeyToInstance(
        token,
        simpleViewingKey,
        VIEWING_KEYS_TYPES.SIMPLE
      )
    }
  }
  await this._saveViewingKeysToStorage()

  // updateSubTokenBalances
  await this.updateSubtokensList(chagedViewingKeyTokens)
}
