import walletsManager from '../../../../walletsManager'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import networkClasses from '../../../../networkClasses'
import { dispatchLibEvent } from '../../../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

// TODO: refact!
export async function updateSubtokensList(tokensForUpdate) {
  const networkClass = networkClasses.getNetworkClass(this.net)
  // return if net does not have tokens
  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length) return

  // SNIP20 update function
  const updateSnip20SubtokensList = async (tokensForUpdate) => {
    // get snip20 tokens
    const { subtokensList: snip20SubtokensList = [] } =
      await this.getSnip20SubtokensList(tokensForUpdate)
    // remove snip20 from old subtokensList
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
      },
    })

    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
  }

  // tokensForUpdate for snip20 only
  if (tokensForUpdate) {
    await updateSnip20SubtokensList(tokensForUpdate)
    return
  }
  // ICS20 update
  const tokenBalances = await this.getSubtokensList()
  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: tokenBalances,
  })

  // SNIP20 update (do not await by default), but dispatch event walletListUpdated
  updateSnip20SubtokensList()
}
