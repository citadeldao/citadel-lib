import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES, WALLET_TYPES } from '../../../../constants'
import walletsManager from '../../../../walletsManager'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import networkClasses from '../../../'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'
import { createSnip20TokenListItem } from '../../../cosmosNetworks/SecretClass/instanceMethods/_functions/createSnip20TokenListItem'
import { saveViewingKeyToInstance } from '../../../cosmosNetworks/SecretClass/instanceMethods/_functions/saveViewingKeyToInstance'

export async function balance_scrt({ token }) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  const snip20Manager = networkClass.getSnip20Manager()

  const updateSubtokensList = async (snip20TokenListItem) => {
    const subtokensListItemIndex = this.subtokensList.findIndex(
      (tokenItem) => tokenItem.net === token
    )
    if (!snip20TokenListItem) {
      // remove item
      subtokensListItemIndex > -1 &&
        this.subtokensList.splice(subtokensListItemIndex, 1)
    } else if (subtokensListItemIndex > -1) {
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
    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
  }

  // CHECK SAVED VK
  if (this.savedViewingKeys[token]) {
    const { viewingKey, viewingKeyType } = this.savedViewingKeys[token]

    const { error, amount } = await snip20Manager.getTokenBalance(
      this.address,
      networkClass.tokens[token].address,
      networkClass.tokens[token].decimals,
      viewingKey
    )

    const snip20TokenListItem = await createSnip20TokenListItem(
      token,
      amount,
      this.savedViewingKeys
    )

    // VK is valid
    if (!error) {
      await updateSubtokensList(snip20TokenListItem)
      return snip20TokenListItem.tokenBalance
    }

    // VK is not valid
    // delete saved VK
    delete this.savedViewingKeys[token]
    // delete subtokenItem
    await updateSubtokensList()
    if (
      viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE &&
      this.type !== WALLET_TYPES.KEPLR
    ) {
      dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
      errors.throwError('ViewingKeyError')
    }
  }

  // simple and keplr VK
  const { viewingKey: newViewingKey, viewingKeyType } =
    await this.getPossibleViewingKeyForCheck(token)

  const response =
    newViewingKey &&
    (await snip20Manager.getTokenBalance(
      this.address,
      networkClass.tokens[token].address,
      networkClass.tokens[token].decimals,
      newViewingKey
    ))

  // VK is not valid
  if (!response || response.error) {
    errors.throwError('ViewingKeyError', { message: response?.error?.message })
  }

  // VK is valid
  // add new VK to savedVK
  saveViewingKeyToInstance(
    token,
    newViewingKey,
    viewingKeyType,
    this.savedViewingKeys
  )

  const snip20TokenListItem = await createSnip20TokenListItem(
    token,
    response.amount,
    this.savedViewingKeys
  )

  await updateSubtokensList(snip20TokenListItem)
  return snip20TokenListItem.tokenBalance
}
