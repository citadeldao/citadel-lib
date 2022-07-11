import walletsManager from '../../../../walletsManager'
import networkClasses from '../../..'
import { createSnip20TokenListItem } from './_functions/createSnip20TokenListItem'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import walletInstances from '../../../../walletInstances'
import snip20Manager from '../snip20Manager'
import storage from '../../../../storage'
import {
  CACHE_NAMES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
  VIEWING_KEYS_TYPES,
  WALLET_TYPES,
} from '../../../../constants'

// TODO: split function
export async function updateSnip20SubtokensList() {
  // skip if wallet has public type
  if (this.type === WALLET_TYPES.PUBLIC_KEY) {
    return
  }

  // get secret tokens config
  const tokensConfig = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)
    .secret.tokens

  const snip20SubtokensList = []

  // 1) check and get balances for saved ViewingKey
  for (const token in this.savedViewingKeys) {
    // skip
    if (
      // if wallet was deleted
      !walletInstances.getWalletInstanceById(this.id) ||
      // if token no longer exists in neworks.json
      !tokensConfig[token]
    ) {
      continue
    }

    // get viewing key and its type from savedViewingKeys
    const { viewingKey } = this.savedViewingKeys[token] || {}

    // get viewing key balance (using a balance request)
    const { error, amount } = await snip20Manager.getTokenBalance(
      this.address,
      tokensConfig[token].address,
      tokensConfig[token].decimals,
      viewingKey
    )

    if (error) {
      // delet token VK from instance
      delete this.savedViewingKeys[token]
      // and skip add token to subtokenList
      continue
    }
    // add token to subtokenList
    const tokenListItem = await createSnip20TokenListItem(
      token,
      amount,
      this.savedViewingKeys
    )
    snip20SubtokensList.push(tokenListItem)
  }

  // 2) check simpleViewingKey for favorite vallets and get it balance
  for (const token in tokensConfig) {
    // skip
    if (
      // skip if wallet does not have privateKeyHash
      !PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(this.type) ||
      // if not snip20
      tokensConfig[token].standard !== 'snip20' ||
      // if wallet was deleted
      !walletInstances.getWalletInstanceById(this.id) ||
      // if token is not favorite
      !tokensConfig[token].favorite ||
      // if  already checked saved VK:
      this.savedViewingKeys[token]
    )
      continue

    const simpleViewingKey = snip20Manager.generateSimpleViewingKey(
      tokensConfig[token].address,
      this.privateKeyHash
    )

    const { error, amount } = await snip20Manager.getTokenBalance(
      this.address,
      tokensConfig[token].address,
      tokensConfig[token].decimals,
      simpleViewingKey
    )

    if (!error) {
      // add token to subtokenList
      const tokenListItem = await createSnip20TokenListItem(
        token,
        amount,
        this.savedViewingKeys
      )
      snip20SubtokensList.push(tokenListItem)
      // save VK to instance
      this.savedViewingKeys[token] = {
        token,
        contractAddress: networkClasses.getNetworkClass(this.net).tokens[token]
          .address,
        viewingKeyType: VIEWING_KEYS_TYPES.SIMPLE,
        viewingKey: simpleViewingKey,
      }
    }
  }

  // get subtokesList without snip20 tokens
  const filteredList = this.subtokensList.filter(
    ({ standard }) => standard !== 'snip20'
  )

  // concat ibc and snip20
  const subtokensList = [...filteredList, ...snip20SubtokensList]

  // calc common balance
  const subtokenBalanceUSD = calculateSubtokenBalanceUSD(subtokensList)

  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: {
      subtokensList,
      subtokenBalanceUSD,
      // update storage VK
      savedViewingKeys: this.savedViewingKeys,
    },
  })
}
