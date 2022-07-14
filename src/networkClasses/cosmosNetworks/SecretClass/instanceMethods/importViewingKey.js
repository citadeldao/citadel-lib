import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import snip20Manager from '../snip20Manager'
import networkClasses from '../../../'
import walletsManager from '../../../../walletsManager'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { createSnip20TokenListItem } from './_functions/createSnip20TokenListItem'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function importViewingKey(token, viewingKey) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  if (this.savedViewingKeys?.[token]?.viewingKey === viewingKey) return
  // check VK
  const { error, amount } = await snip20Manager.getTokenBalance(
    this.address,
    networkClass.tokens[token].address,
    networkClass.tokens[token].decimals,
    viewingKey
  )
  error &&
    errors.throwError('ViewingKeyError', {
      message: `Viewing key is not valid. ${error.message}`,
    })

  // save VK to instance
  this.savedViewingKeys[token] = {
    token,
    contractAddress: networkClasses.getNetworkClass(this.net).tokens[token]
      .address,
    viewingKeyType: VIEWING_KEYS_TYPES.CUSTOM,
    viewingKey,
  }

  // remove old token from subtokensList if it exist
  const subtokensListItemIndex = this.subtokensList.findIndex(
    (tokenItem) => tokenItem.net === token
  )
  subtokensListItemIndex > -1 &&
    this.subtokensList.splice(subtokensListItemIndex, 1)

  // add token to subtokenList
  const tokenListItem = await createSnip20TokenListItem(
    token,
    amount,
    this.savedViewingKeys
  )
  this.subtokensList.push(tokenListItem)

  // save viewing keys to storage
  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: {
      savedViewingKeys: this.savedViewingKeys,
      subtokensList: this.subtokensList,
      subtokenBalanceUSD: calculateSubtokenBalanceUSD(this.subtokensList),
    },
  })

  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
