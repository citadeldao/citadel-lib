import walletsManager from '../../../../walletsManager'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function deleteViewingKey(token) {
  // delet token VK from instance
  delete this.savedViewingKeys[token]

  // remove token from subtokensList
  const subtokensListItemIndex = this.subtokensList.findIndex(
    (tokenItem) => tokenItem.net === token
  )
  subtokensListItemIndex > -1 &&
    this.subtokensList.splice(subtokensListItemIndex, 1)

  // update storage wallet
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
