import walletsManager from '../../../../walletsManager'
import { createSnip20TokenListItem } from './_functions/createSnip20TokenListItem'
import { saveViewingKeyToInstance } from './_functions/saveViewingKeyToInstance'
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
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

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
  // 1) CHECK SAVED VIEWING_KEYS
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

    let error = null
    let amount = null
    // get viewing key balance (using a balance request)
    const response = await snip20Manager.getTokenBalance(
      this.address,
      tokensConfig[token].address,
      tokensConfig[token].decimals,
      viewingKey
    )

    error = response.error
    amount = response.amount

    // check keplr vk on error
    if (error && this.type === WALLET_TYPES.KEPLR) {
      try {
        const keplrViewingKey = await this.getViewingKeyByKeplr(token)

        if (keplrViewingKey) {
          const response = await snip20Manager.getTokenBalance(
            this.address,
            tokensConfig[token].address,
            tokensConfig[token].decimals,
            keplrViewingKey
          )
          error = response.error
          amount = response.amount
          // save VK
          if (amount) {
            saveViewingKeyToInstance(
              token,
              keplrViewingKey,
              VIEWING_KEYS_TYPES.CUSTOM,
              this.savedViewingKeys
            )
          }
        }
        // viewingKeyType = VIEWING_KEYS_TYPES.CUSTOM
      } catch {
        // skip all keplr errors
        false
      }
    }

    // delete saved VK on error
    if (error) {
      // delete token VK from instance
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

  // 2) check simpleViewingKey for favorite wallets and get it balance
  for (const token in tokensConfig) {
    // skip
    if (
      // // skip if wallet does not have privateKeyHash
      // !PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(this.type) ||
      // if not snip20
      tokensConfig[token].standard !== 'snip20' ||
      // if wallet was deleted
      !walletInstances.getWalletInstanceById(this.id) ||
      // // if token is not favorite
      // !tokensConfig[token].favorite ||
      // if  already checked saved VK:
      this.savedViewingKeys[token]
    )
      continue
    let viewingKey = null
    let viewingKeyType = null

    // check simple viewing key for favorite token
    if (
      PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(this.type) &&
      tokensConfig[token].favorite
    ) {
      viewingKey = snip20Manager.generateSimpleViewingKey(
        tokensConfig[token].address,
        this.privateKeyHash
      )
      viewingKeyType = VIEWING_KEYS_TYPES.SIMPLE
    }

    // check keplr viewing key for all snip20 tokens
    if (this.type === WALLET_TYPES.KEPLR) {
      try {
        viewingKey = await this.getViewingKeyByKeplr(token)
        viewingKeyType = VIEWING_KEYS_TYPES.CUSTOM
      } catch {
        // skip all keplr errors
        false
      }
    }

    if (!viewingKey) {
      continue
    }
    const { error, amount } = await snip20Manager.getTokenBalance(
      this.address,
      tokensConfig[token].address,
      tokensConfig[token].decimals,
      viewingKey
    )

    if (!error) {
      // save VK to instance
      saveViewingKeyToInstance(
        token,
        viewingKey,
        viewingKeyType,
        this.savedViewingKeys
      )

      // add token to subtokenList
      const tokenListItem = await createSnip20TokenListItem(
        token,
        amount,
        this.savedViewingKeys
      )
      snip20SubtokensList.push(tokenListItem)
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
  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
