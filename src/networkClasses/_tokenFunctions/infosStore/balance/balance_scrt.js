import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import walletsManager from '../../../../walletsManager'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import { merge } from '../../../../helpers/merge'
import networkClasses from '../../../'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

// TODO: refact
export async function balance_scrt({ token }) {
  const networkClass = networkClasses.getNetworkClass(this.net)
  const updateSubtokensList = async (vkIsValid, tokenBalance) => {
    if (vkIsValid) {
      // update subtokensList
      const subtokensListItem =
        this.subtokensList.find((tokenItem) => tokenItem.net === token) || {}
      merge(subtokensListItem.tokenBalance, tokenBalance)
    } else {
      const subtokensListItemIndex = this.subtokensList.findIndex(
        (tokenItem) => tokenItem.net === token
      )
      subtokensListItemIndex > -1 &&
        this.subtokensList.splice(subtokensListItemIndex, 1)
    }
    // update subtokenBalance
    this.subtokenBalanceUSD = calculateSubtokenBalanceUSD(this.subtokensList)
    // update wallet
    walletsManager.updateWallet({
      walletId: this.id,
      newWalletInfo: {
        subtokensList: this.subtokensList,
        subtokenBalanceUSD: this.subtokenBalanceUSD,
      },
    })
  }

  const snip20Manager = networkClass.getSnip20Manager()

  // check saved viewingKey
  // get viewing key
  const { viewingKey, viewingKeyType } = this.savedViewingKeys[token] || {}
  if (viewingKey) {
    const { error, amount } = await snip20Manager.getTokenBalance(
      this.address,
      networkClass.tokens[token].address,
      networkClass.tokens[token].decimals,
      viewingKey
    )

    const tokenBalance = { mainBalance: amount, calculatedBalance: amount }

    // VK is valid
    if (!error) {
      await updateSubtokensList(true, tokenBalance)
      return { mainBalance: amount, calculatedBalance: amount }
    }

    // VK is not valid
    this._saveViewingKeyToInstance(token, null)
    // update savedViewingKeys
    await this._saveViewingKeysToStorage()
    await updateSubtokensList(false)
    viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE &&
      errors.throwError('ViewingKeyError')
  }

  // check simple viewingKey
  const simpleViewingKey = snip20Manager.generateSimpleViewingKey(
    networkClass.tokens[token].address,
    this.privateKeyHash
  )
  const { amount, error } = await snip20Manager.getTokenBalance(
    this.address,
    networkClass.tokens[token].address,
    networkClass.tokens[token].decimals,
    simpleViewingKey
  )
  error && errors.throwError('ViewingKeyError', { message: error.message })

  this._saveViewingKeyToInstance(
    token,
    simpleViewingKey,
    VIEWING_KEYS_TYPES.SIMPLE
  )
  await this._saveViewingKeysToStorage()
  const tokenBalance = { mainBalance: amount, calculatedBalance: amount }
  await updateSubtokensList(true, tokenBalance)

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  return tokenBalance
}
