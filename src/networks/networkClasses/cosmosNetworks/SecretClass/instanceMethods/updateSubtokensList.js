import storage from '../../../../../storage'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import networks from '../../../../../networks'

export async function updateSubtokensList(tokensForUpdate) {
  const networkClass = networks.getNetworkClass(this.net)
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
    storage.wallets.updateWallet({
      walletId: this.id,
      newWalletInfo: {
        subtokensList,
        subtokenBalanceUSD,
      },
    })
  }
  // tokensForUpdate for snip20 only
  if (tokensForUpdate) {
    await updateSnip20SubtokensList(tokensForUpdate)
    return
  }
  // ICS20 update
  const tokenBalances = await this.getSubtokensList()
  storage.wallets.updateWallet({
    walletId: this.id,
    newWalletInfo: tokenBalances,
  })

  // SNIP20 update (do not await by default)
  updateSnip20SubtokensList()
}
