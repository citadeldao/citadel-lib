import networkClasses from '../../../'
import snip20Manager from '../snip20Manager'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import walletsManager from '../../../../walletsManager'
import { saveViewingKeyToInstance } from './_functions/saveViewingKeyToInstance'
import { createSnip20TokenListItem } from './_functions/createSnip20TokenListItem'

//** Load SNIP-20 balance by viewingKey and update of the saved viewing key, subtokenlist and subtokenlist total balance */
export async function loadSnip20TokenBalance(
  token,
  viewingKey,
  viewingKeyType
) {
  let response = null
  let error = null
  const tokenConfig = networkClasses.getNetworkClass(this.net).tokens[token]
  // get balance
  try {
    response = await snip20Manager.getTokenBalance(
      this.address,
      tokenConfig.address,
      tokenConfig.decimals,
      viewingKey
    )
    error = response.error?.message
  } catch (err) {
    error = err.message
  }

  // VK is not valid
  if (error) {
    // is VK saved?
    if (this.savedViewingKeys[token]) {
      // delete saved VK
      delete this.savedViewingKeys[token]
      // delete subtokenListItem
      const subtokensListItemIndex = this.subtokensList.findIndex(
        (tokenItem) => tokenItem.net === token
      )
      subtokensListItemIndex > -1 &&
        this.subtokensList.splice(subtokensListItemIndex, 1)
      // update subtokenBalance
      this.subtokenBalanceUSD = calculateSubtokenBalanceUSD(this.subtokensList)
      // update wallet
      walletsManager.updateWallet({
        walletId: this.id,
        newWalletInfo: {
          subtokensList: this.subtokensList,
          subtokenBalanceUSD: this.subtokenBalanceUSD,
          savedViewingKeys: this.savedViewingKeys,
        },
      })
    }
    // return error message
    return {
      error,
    }
  }

  // VK is valid
  if (this.savedViewingKeys?.[token]?.viewingKey !== viewingKey) {
    // add new VK to savedVK if it not saved
    saveViewingKeyToInstance(
      token,
      viewingKey,
      viewingKeyType,
      this.savedViewingKeys
    )
  }

  // create snip20TokenListItem
  const snip20TokenListItem = await createSnip20TokenListItem(
    token,
    response.amount,
    this.savedViewingKeys
  )

  // update subtokesList
  const subtokensListItemIndex = this.subtokensList.findIndex(
    (tokenItem) => tokenItem.net === token
  )

  if (subtokensListItemIndex > -1) {
    // update subtokensList
    this.subtokensList[subtokensListItemIndex] = snip20TokenListItem
  } else {
    // push new item
    this.subtokensList.push(snip20TokenListItem)
  }

  // update subtokenBalance
  this.subtokenBalanceUSD = calculateSubtokenBalanceUSD(this.subtokensList)

  // update wallet
  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: {
      subtokensList: this.subtokensList,
      subtokenBalanceUSD: this.subtokenBalanceUSD,
      savedViewingKeys: this.savedViewingKeys,
    },
  })

  return {
    tokenBalance: snip20TokenListItem.tokenBalance,
  }
}
