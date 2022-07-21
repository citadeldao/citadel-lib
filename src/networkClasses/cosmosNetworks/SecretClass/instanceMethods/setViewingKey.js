import { VIEWING_KEYS_TYPES } from '../../../../constants'
import snip20Manager from '../snip20Manager'
import networkClasses from '../../../'
import walletsManager from '../../../../walletsManager'
import { createSnip20TokenListItem } from './_functions/createSnip20TokenListItem'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function setViewingKey(
  token,
  viewingKeyType,
  { privateKey, derivationPath, viewingKey, fee } = {}
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // set vievingKey
  const data = await snip20Manager.setViewingKey(viewingKeyType, {
    address: this.address,
    contractAddress: networkClass.tokens[token].address,
    type: this.type,
    publicKey: this.publicKey,
    privateKey,
    privateKeyHash: this.privateKeyHash,
    derivationPath,
    viewingKey,
    fee,
  })

  // save VK to instance
  this.savedViewingKeys[token] = {
    token,
    contractAddress: networkClasses.getNetworkClass(this.net).tokens[token]
      .address,
    viewingKeyType:
      viewingKeyType === VIEWING_KEYS_TYPES.RANDOM
        ? VIEWING_KEYS_TYPES.CUSTOM
        : viewingKeyType,
    viewingKey: data.viewingKey,
  }

  // remove old token from subtokensList if it exist
  const subtokensListItemIndex = this.subtokensList.findIndex(
    (tokenItem) => tokenItem.net === token
  )
  subtokensListItemIndex > -1 &&
    this.subtokensList.splice(subtokensListItemIndex, 1)

  // get balance
  const { amount } = await snip20Manager.getTokenBalance(
    this.address,
    networkClass.tokens[token].address,
    networkClass.tokens[token].decimals,
    viewingKey
  )

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

  // return hash and new VK
  return data
}
