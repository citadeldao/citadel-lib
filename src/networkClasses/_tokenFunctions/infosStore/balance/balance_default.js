import api from '../../../../api'
import walletsManager from '../../../../walletsManager'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import { merge } from '../../../../helpers/merge'
import { dispatchLibEvent } from '../../../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function balance_default({ token }) {
  // get token balance
  const { data: tokenBalance } = await api.formattedApi.getDelegationBalance({
    net: token,
    address: this.address,
  })

  // update subtokensList and subtokenBalance
  if (this.subtokensList) {
    const subtokensListItem =
      this.subtokensList.find((tokenItem) => tokenItem.net === token) || {}
    merge(subtokensListItem.tokenBalance, tokenBalance)
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

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  return tokenBalance
}
