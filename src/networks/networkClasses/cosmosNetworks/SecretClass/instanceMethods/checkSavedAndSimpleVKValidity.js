import { VIEWING_KEYS_TYPES, WALLET_TYPES } from '../../../../../constants'
import walletInstances from '../../../../../walletInstances'
import snip20Manager from '../snip20Manager'
import networks from '../../../..'

export async function checkSavedAndSimpleVKValidity() {
  const networkClass = networks.getNetworkClass(this.net)
  if (this.type === WALLET_TYPES.PUBLIC_KEY) return
  // collect tokens for custom subtokensList update
  const chagedViewingKeyTokens = []
  // check saved ViewingKey
  // do not use Promise.all because 429 cosmWasm error (too many requests)
  for (const token in this.savedViewingKeys) {
    // checking that the wallet was not deleted
    if (!walletInstances.getWalletInstanceById(this.id)) continue

    // skip if token no longer exists in neworks.json
    if (!networkClass.tokens[token]) continue

    const { favorite } = networkClass.tokens[token]
    const { viewingKey, viewingKeyType } = this.savedViewingKeys[token] || {}
    // skip favorite for next SVK check loop
    if (favorite && viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE) continue
    const { error } = await snip20Manager.getTokenBalance(
      this.address,
      networkClass.tokens[token].address,
      networkClass.tokens[token].decimals,
      viewingKey
    )
    if (error) {
      chagedViewingKeyTokens.push(token)
      this._saveViewingKeyToInstance(token, null)
    }
  }

  // check simpleViewingKey for favorite vallets
  for (const token in networkClass.tokens) {
    // checking that the wallet was not deleted

    if (!walletInstances.getWalletInstanceById(this.id)) continue
    const { favorite } = networkClass.tokens[token]
    if (!favorite) continue
    const { viewingKeyType } = this.savedViewingKeys[token] || {}
    // skip already checked VK:
    if (viewingKeyType === VIEWING_KEYS_TYPES.CUSTOM) continue
    const simpleViewingKey = snip20Manager.generateSimpleViewingKey(
      networkClass.tokens[token].address,
      this.privateKeyHash
    )
    const { error } = await snip20Manager.getTokenBalance(
      this.address,
      networkClass.tokens[token].address,
      networkClass.tokens[token].decimals,
      simpleViewingKey
    )
    if (!error) {
      this._saveViewingKeyToInstance
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
